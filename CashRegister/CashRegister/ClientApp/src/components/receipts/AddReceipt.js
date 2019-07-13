import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";

class AddReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedProducts: [], loading: true, selectedId: 0 };
    this.handleNameSearch = debounce(this.handleNameSearch, 500);
    this.handleBarcodeSearch = debounce(this.handleBarcodeSearch, 500);
  }

  componentDidMount() {
    document.addEventListener("keydown", e => this.handleKeyPress(e));
    if (
      localStorage.getItem("cashierId") === null ||
      localStorage.getItem("registerId") === null
    ) {
      alert("You must log in to create a receipt");
      this.props.history.push("/");
    }
    axios.get("/api/products/all").then(response => {
      this.setState({
        products: response.data,
        loading: false
      });
    });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddProduct(product) {
    if (
      this.state.selectedProducts.some(
        selectedProduct => selectedProduct.id === product.id
      )
    ) {
      return;
    }
    this.setState({
      ...this.state,
      selectedProducts: [...this.state.selectedProducts, product]
    });
  }

  handleRemoveProduct(product) {
    let { selectedProducts } = this.state;
    selectedProducts = selectedProducts.filter(
      selectedProduct => selectedProduct.barcode !== product.barcode
    );
    this.setState({
      ...this.state,
      selectedProducts
    });
  }

  handleNameSearch() {
    this.refs.barcode.value = "";
    if (this.refs.name.value === null) {
      return;
    }
    if (this.refs.name.value.length <= 3) {
      axios.get("/api/products/all").then(response => {
        this.setState({
          products: response.data,
          selectedId: 0
        });
      });
      return;
    }
    axios
      .get("/api/products/search-products-by-name", {
        params: { search: this.refs.name.value }
      })
      .then(response => {
        this.setState({
          products: response.data,
          selectedId: 0
        });
      });
  }

  handleBarcodeSearch() {
    this.refs.name.value = "";
    if (this.refs.barcode.value === null) {
      return;
    }
    if (this.refs.barcode.value.length <= 3) {
      axios.get("/api/products/all").then(response => {
        this.setState({
          products: response.data,
          selectedId: 0
        });
      });
      return;
    }
    axios
      .get("/api/products/search-products-by-barcode", {
        params: { search: this.refs.barcode.value }
      })
      .then(response => {
        this.setState({
          products: response.data,
          selectedId: 0
        });
      });
  }

  handleSubmit() {
    let { selectedProducts } = this.state;
    selectedProducts = selectedProducts.filter(
      selectedProduct => this.refs[selectedProduct.name].value > 0
    );
    if (selectedProducts.length < 1) {
      return;
    }
    let receiptProducts = selectedProducts.map(selectedProduct => {
      return {
        productId: selectedProduct.id,
        quantity: this.refs[selectedProduct.name].value,
        taxType: selectedProduct.taxType,
        price: selectedProduct.priceWithTax
      };
    });
    let receipt = {
      cashierId: localStorage.getItem("cashierId"),
      registerId: localStorage.getItem("registerId"),
      receiptProducts: receiptProducts
    };
    axios
      .post("api/receipts/add", receipt)
      .then(response => {
        alert("Add successful");
        this.props.history.push(
          `/receipts/details/${response.data}?print=true`
        );
      })
      .catch(() => alert("Add unsuccessful"));
  }

  handleClear() {
    this.setState({ selectedProducts: [] });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleAddProduct(
        this.state.products.filter(
          (product, index) => index === this.state.selectedId
        )[0]
      );
    } else if (e.keyCode === 38) {
      if (this.state.selectedId === 0) {
        return;
      }
      this.setState({ selectedId: this.state.selectedId - 1 });
    } else if (e.keyCode === 40) {
      if (this.state.selectedId === this.state.products.length - 1) {
        return;
      }
      this.setState({ selectedId: this.state.selectedId + 1 });
    } else if (e.keyCode === 113) {
      this.handleSubmit();
    }
  }

  render() {
    let content = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h3>List of Products</h3>
        Search by Name:{" "}
        <input onChange={() => this.handleNameSearch()} ref="name" />
        <br />
        <br />
        Search by Barcode:{" "}
        <input onChange={() => this.handleBarcodeSearch()} ref="barcode" />
        <div className="scroll">
          {this.state.products.map((product, index) => {
            return (
              <p
                className={
                  index === this.state.selectedId ? "product bgC-r" : "product"
                }
                onClick={() => this.handleAddProduct(product)}
              >
                {product.name} ({product.barcode}) - Available Amount:{" "}
                {product.availableAmount}
              </p>
            );
          })}
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="receipt-container">
          <h3>Add Receipt</h3>
          {this.state.selectedProducts.map(product => {
            return (
              <div className="receipt-row">
                <div>
                  {product.name} ({product.barcode})
                </div>{" "}
                <div>
                  Quantity:{" "}
                  <input
                    min="0"
                    type="number"
                    onChange={e => this.handleInputChange(e)}
                    ref={product.name}
                    defaultValue={1}
                  />
                  <button
                    className="remove-button"
                    onClick={() => this.handleRemoveProduct(product)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            <button
              className="submit-button"
              onClick={() => this.handleSubmit()}
              disabled={this.state.selectedProducts.length < 1}
            >
              Complete Receipt (F2)
            </button>{" "}
            <button
              className="submit-button"
              onClick={() => this.handleClear()}
              disabled={this.state.selectedProducts.length < 1}
            >
              Clear Receipt
            </button>
          </div>
        </div>
        <div className="receipt-container">{content}</div>
      </div>
    );
  }
}

export default withRouter(AddReceipt);
