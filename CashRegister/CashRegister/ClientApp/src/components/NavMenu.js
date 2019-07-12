import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Axios from "axios";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleSwitchCashier = this.handleSwitchCashier.bind(this);
    this.handleSwitchRegister = this.handleSwitchRegister.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleSwitchCashier() {
    Axios.get("/api/cashiers/get-by-id", { params: { id: 1 } }).then(
      response => {
        localStorage.setItem("cashier", JSON.stringify(response.data));
      }
    );
  }

  handleSwitchRegister() {
    localStorage.setItem("registerId", 1);
  }

  render() {
    return (
      <header className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
        <div className="navbar-nav flex-grow">
          <h4 className="title">Cash Register</h4>
          <Link to="/receipts/add" className="ml-10">
            Add Receipt
          </Link>
          <Link to="/receipts" className="ml-10">
            Receipts
          </Link>
          <Link to="/products" className="ml-10">
            Products
          </Link>
          <Link to="/products/add" className="ml-10">
            Add Product
          </Link>
          <Link to="/products/delivery" className="ml-10">
            Delivery
          </Link>
        </div>
        <div>
          <button
            className="buttons"
            onClick={() => this.handleSwitchRegister()}
          >
            Switch Register
          </button>
          <button
            className="buttons"
            onClick={() => this.handleSwitchCashier()}
          >
            Log out
          </button>
        </div>
      </header>
    );
  }
}
