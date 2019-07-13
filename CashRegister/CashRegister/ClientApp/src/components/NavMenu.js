import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.handleSwitchCashier = this.handleSwitchCashier.bind(this);
    this.handleSwitchRegister = this.handleSwitchRegister.bind(this);
  }

  handleSwitchCashier() {
    localStorage.removeItem("cashierId");
    this.props.history.push("/cashiers");
  }

  handleSwitchRegister() {
    localStorage.removeItem("registerId");
    this.props.history.push("/registers");
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
            {localStorage.getItem("cashierId") !== null ? "Log out" : "Log in"}
          </button>
        </div>
      </header>
    );
  }
}

export default withRouter(NavMenu);
