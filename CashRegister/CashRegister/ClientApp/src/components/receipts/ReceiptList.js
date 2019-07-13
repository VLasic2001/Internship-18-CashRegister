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

  // handlePrint(receipt) {
  //   let sumOfTax = 0;
  //   let d = React.createElement("div", { className: "receipt" }, [
  //     <div>
  //       <h2>Id: {receipt.id}</h2>
  //       <span>
  //         Date of Issue:{" "}
  //         {new Intl.DateTimeFormat("en-GB", {
  //           year: "numeric",
  //           month: "numeric",
  //           day: "numeric",
  //           hour: "numeric",
  //           minute: "numeric",
  //           second: "numeric",
  //           hour12: false
  //         }).format(new Date(Date.parse(receipt.dateOfIssue)))}
  //       </span>
  //       <br />
  //       <span>
  //         Cashier: {receipt.cashier.firstName} {receipt.cashier.firstName}
  //       </span>
  //       <br />
  //       <span>Cash Register Id: {receipt.registerId}</span>
  //       <table>
  //         <tr>
  //           <th>Name</th>
  //           <th>Price</th>
  //           <th>Quantity</th>
  //           <th>Total</th>
  //         </tr>
  //         {receipt.receiptProducts.map(receiptProduct => {
  //           sumOfTax +=
  //             (receiptProduct.price /
  //               (receiptProduct.product.type === "excise" ? 5 : 21)) *
  //             receiptProduct.quantity;
  //           return (
  //             <tr>
  //               <td>{receiptProduct.product.name}</td>
  //               <td>{receiptProduct.price}</td>
  //               <td>{receiptProduct.quantity}</td>
  //               <td>{receiptProduct.price * receiptProduct.quantity}</td>
  //             </tr>
  //           );
  //         })}
  //       </table>
  //       <br />
  //       <p>
  //         Price Without Tax:{" "}
  //         {(this.priceSumOfReceipt(receipt) - sumOfTax).toFixed(2)}
  //       </p>
  //       <p>Tax: {sumOfTax.toFixed(2)}</p>
  //       <p>Price With Tax: {this.priceSumOfReceipt(receipt).toFixed(2)}</p>
  //     </div>
  //   ]);
  //   console.log(d);
  // }

  handleDateSearch() {
    axios
      .get("/api/receipts/search-by-date", {
        params: { date: Date.parse(this.refs.date.value) }
      })
      .then(response => {
        this.setState({
          receipts: response.data
        });
      });
  }

  render() {
    let content = this.state.loading ? (
      <span>Loading...</span>
    ) : this.state.receipts.length < 1 ? (
      <div>
        <h3>List of Receipts</h3>
        <p>
          Search by Date: <input type="date" ref="date" />
          <button
            className="edit-button"
            onClick={() => this.handleDateSearch()}
          >
            Search
          </button>
        </p>
        <span>No Receipts Found</span>
      </div>
    ) : (
      <div>
        <h3>List of Receipts</h3>
        <p>
          Search by Date: <input type="date" ref="date" />
          <button
            className="edit-button"
            onClick={() => this.handleDateSearch()}
          >
            Search
          </button>
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
                    // onClick={() => this.handlePrint(receipt)}
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
