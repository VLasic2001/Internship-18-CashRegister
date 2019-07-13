import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Printd } from "printd";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { receipts: [], loading: true, page: 1 };
    this.priceSumOfReceipt = this.priceSumOfReceipt.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/receipts/search-by-date", {
        params: {
          page: 1
        }
      })
      .then(response => {
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

  handleNextPage() {
    axios
      .get("/api/receipts/search-by-date", {
        params: {
          date:
            this.refs.date.value === "" ? 0 : Date.parse(this.refs.date.value),
          page: this.state.page + 1
        }
      })
      .then(response => {
        this.setState({
          receipts: response.data,
          page: this.state.page + 1
        });
      });
  }

  handlePrevPage() {
    axios
      .get("/api/receipts/search-by-date", {
        params: {
          date:
            this.refs.date.value === "" ? 0 : Date.parse(this.refs.date.value),
          page: this.state.page - 1
        }
      })
      .then(response => {
        this.setState({
          receipts: response.data,
          page: this.state.page - 1
        });
      });
  }

  handleDateSearch() {
    axios
      .get("/api/receipts/search-by-date", {
        params: { date: Date.parse(this.refs.date.value), page: 1 }
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
        <button
          className="edit-button"
          onClick={() => this.handlePrevPage()}
          disabled={this.state.page === 1}
        >
          Prev page
        </button>{" "}
        <button
          className="edit-button"
          onClick={() => this.handleNextPage()}
          disabled={this.state.receipts.length < 10}
        >
          Next page
        </button>
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
        <button
          className="edit-button"
          onClick={() => this.handlePrevPage()}
          disabled={this.state.page === 1}
        >
          Prev page
        </button>{" "}
        <button
          className="edit-button"
          onClick={() => this.handleNextPage()}
          disabled={this.state.receipts.length < 10}
        >
          Next page
        </button>
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
