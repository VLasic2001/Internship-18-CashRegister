import React, { Component } from "react";
import Axios from "axios";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    Axios.post("api/products/add", {
      barcode: this.state.barcodeInput,
      name: this.state.nameInput,
      priceWithTax: this.state.priceInput,
      type: this.refs.taxType.value,
      availableAmount: this.state.amountInput
    });
  }

  render() {
    return (
      <div className="add-form">
        <h3>Add Product</h3>
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
            name="nameInput"
            value={this.state.nameInput}
            placeholder="e.g. Coca-Cola"
            onChange={e => this.handleInputChange(e)}
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
            name="amountInput"
            type="number"
            value={this.state.amountInput}
            placeholder="e.g. 100"
            onChange={e => this.handleInputChange(e)}
          />
        </p>
        <button className="submit-button" onClick={() => this.handleSubmit()}>
          Add Product
        </button>
      </div>
    );
  }
}

export default AddProduct;
