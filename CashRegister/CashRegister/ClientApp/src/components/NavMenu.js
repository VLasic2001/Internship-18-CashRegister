import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
        </div>
        <div>
          <button className="buttons">Switch Register</button>
          <button className="buttons">Log out</button>
        </div>
      </header>
    );
  }
}
