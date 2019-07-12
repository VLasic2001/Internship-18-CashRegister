import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Printd } from "printd";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { receipts: [], loading: true };
    this.priceSumOfReceipt = this.priceSumOfReceipt.bind(this);
  }

  componentDidMount() {
    axios.get("/api/receipts/all").then(response => {
      this.setState({
        receipts: response.data,
        loading: false
      });
    });
  }

  priceSumOfReceipt(receipt) {
    let sum = 0;
    receipt.receiptProducts.map(
      receiptProduct => (sum += receiptProduct.price * receiptProduct.quantity)
    );
    return sum;
  }

  handlePrint(receipt) {}

  render() {
    let content = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h3>List of Receipts</h3>
        <p>
          Search by Date: <input type="date" ref="taxType" />
        </p>
        {this.state.receipts.map(receipt => {
          return (
            <div className="product">
              <div>
                <h3>Id: {receipt.id}</h3>
                <p>
                  Date of Issue:{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false
                  }).format(new Date(Date.parse(receipt.dateOfIssue)))}
                </p>
                <p>
                  Cashier: {receipt.cashier.firstName}{" "}
                  {receipt.cashier.lastName}
                </p>
                <p>Total Price: {this.priceSumOfReceipt(receipt)}</p>
                <div>
                  <Link
                    className="edit-button"
                    to={`/receipts/details/${receipt.id}`}
                  >
                    Details
                  </Link>
                  {"  "}
                  <button
                    className="edit-button"
                    onClick={() => this.handlePrint(receipt)}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
    return <div>{content}</div>;
  }
}

export default ProductList;
