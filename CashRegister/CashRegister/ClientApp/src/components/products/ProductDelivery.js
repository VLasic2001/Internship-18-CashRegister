import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class ProductDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedProducts: [], loading: true };
  }

  componentDidMount() {
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
  handleSearch(e) {
    if (e.target.value.length <= 3) {
      axios.get("/api/products/all").then(response => {
        this.setState({
          products: response.data
        });
      });
      return;
    }
    axios
      .get("/api/products/search-products", {
        params: { search: e.target.value }
      })
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }

  handleSubmit() {
    let { selectedProducts } = this.state;
    let productAmounts = selectedProducts.map(selectedProduct => {
      return {
        productId: selectedProduct.id,
        quantity: this.refs[selectedProduct.name].value
      };
    });

    axios
      .post("api/products/delivery", productAmounts)
      .then(() => {
        alert("Add successful");
        this.props.history.push("/products");
      })
      .catch(() => alert("Add unsuccessful"));
  }

  handleClear() {
    this.setState({ selectedProducts: [] });
  }

  render() {
    let content = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h3>List of Products</h3>
        Search by Name: <input onChange={e => this.handleSearch(e)} />
        <div className="scroll">
          {this.state.products.map(product => {
            return (
              <p
                className="product"
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
          <h3>Add Delivered Products</h3>
          {this.state.selectedProducts.map(product => {
            return (
              <div className="receipt-row">
                <div>
                  {product.name} ({product.barcode})
                </div>{" "}
                <div>
                  Quantity:{" "}
                  <input
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
              Complete delivery
            </button>{" "}
            <button
              className="submit-button"
              onClick={() => this.handleClear()}
              disabled={this.state.selectedProducts.length < 1}
            >
              Clear Delivery
            </button>
          </div>
        </div>
        <div className="receipt-container">{content}</div>
      </div>
    );
  }
}

export default withRouter(ProductDelivery);
