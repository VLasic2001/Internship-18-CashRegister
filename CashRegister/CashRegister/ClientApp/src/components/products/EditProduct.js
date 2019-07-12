import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Axios.get("/api/products/get-by-id", { params: { id: id } }).then(
      response => {
        this.setState({
          barcodeInput: response.data.barcode,
          nameInput: response.data.name,
          priceInput: response.data.priceWithTax,
          typeInput: response.data.type,
          amountInput: response.data.availableAmount,
          id: response.data.id
        });
      }
    );
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    Axios.post("api/products/edit", {
      barcode: this.state.barcodeInput,
      name: this.state.nameInput,
      priceWithTax: this.state.priceInput,
      type: this.refs.taxType.value,
      availableAmount: this.state.amountInput,
      id: this.state.id
    })
      .then(response => {
        alert("Edit successful");
        this.props.history.push("/products");
      })
      .catch(() => alert("Edit unsuccessful"));
  }

  render() {
    return (
      <div>
        <h3>Edit Product</h3>
        <p>
          Barcode:{" "}
          <input
            name="barcodeInput"
            value={this.state.barcodeInput}
            placeholder="e.g. 12345678"
            onChange={e => this.handleInputChange(e)}
          />
        </p>
        <p>
          Name:{" "}
          <input
            disabled="disabled"
            name="nameInput"
            value={this.state.nameInput}
            placeholder="e.g. Coca-Cola"
          />
        </p>
        <p>
          Price:{" "}
          <input
            name="priceInput"
            type="number"
            value={this.state.priceInput}
            placeholder="e.g. 15"
            onChange={e => this.handleInputChange(e)}
          />
        </p>
        <p>
          Tax type:{" "}
          <select ref="taxType">
            <option value="excise">Excise</option>
            <option value="other">Other</option>
          </select>
        </p>
        <p>
          Available amount:{" "}
          <input
            disabled="disabled"
            name="amountInput"
            type="number"
            value={this.state.amountInput}
            placeholder="e.g. 100"
          />
        </p>
        <button className="submit-button" onClick={() => this.handleSubmit()}>
          Edit Product
        </button>
      </div>
    );
  }
}

export default withRouter(EditProduct);
