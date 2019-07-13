import React, { Component } from "react";
import Axios from "axios";
import { Printd } from "printd";
import "./Receipt.css";

class ReceiptDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { receipt: null, loading: true };
    this.priceSumOfReceipt = this.priceSumOfReceipt.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    Axios.get("/api/receipts/get-by-id", { params: { id: id } }).then(
      response => {
        this.setState({
          receipt: response.data,
          loading: false
        });
      }
    );
  }

  priceSumOfReceipt(receipt) {
    let sum = 0;
    receipt.receiptProducts.map(
      receiptProduct => (sum += receiptProduct.price * receiptProduct.quantity)
    );
    return sum;
  }

  handlePrint() {
    let a = document.getElementsByClassName("receipt")[0];
    new Printd().print(a);
  }

  render() {
    let sumOfTax = 0;
    let content = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        <div className="receipt">
          <h2>Id: {this.state.receipt.id}</h2>
          <span>
            Date of Issue:{" "}
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false
            }).format(new Date(Date.parse(this.state.receipt.dateOfIssue)))}
          </span>
          <br />
          <span>
            Cashier: {this.state.receipt.cashier.firstName}{" "}
            {this.state.receipt.cashier.firstName}
          </span>
          <br />
          <span>Cash Register Id: {this.state.receipt.registerId}</span>
          <table>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {this.state.receipt.receiptProducts.map(receiptProduct => {
              sumOfTax +=
                (receiptProduct.price /
                  (receiptProduct.product.type === "excise" ? 21 : 5)) *
                receiptProduct.quantity;
              return (
                <tr>
                  <td>{receiptProduct.product.name}</td>
                  <td>{receiptProduct.price}</td>
                  <td>{receiptProduct.quantity}</td>
                  <td>{receiptProduct.price * receiptProduct.quantity}</td>
                </tr>
              );
            })}
          </table>
          <br />
          <p>
            Price Without Tax:{" "}
            {(this.priceSumOfReceipt(this.state.receipt) - sumOfTax).toFixed(2)}
          </p>
          <p>Tax: {sumOfTax.toFixed(2)}</p>
          <p>
            Price With Tax:{" "}
            {this.priceSumOfReceipt(this.state.receipt).toFixed(2)}
          </p>
        </div>
        <div>
          <button className="edit-button" onClick={() => this.handlePrint()}>
            Print
          </button>
        </div>
      </div>
    );
    return <div>{content}</div>;
  }
}

export default ReceiptDetails;
