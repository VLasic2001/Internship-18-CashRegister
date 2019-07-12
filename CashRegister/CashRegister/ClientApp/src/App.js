import React, { Component } from "react";
import { Route } from "react-router";
import { NavMenu } from "./components/NavMenu";
import { Home } from "./components/Home";
import Products from "./components/products/Products";
import Receipts from "./components/receipts/Receipts";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Route exact path="/" component={Home} />
        <Route path="/receipts" component={Receipts} />
        <Route path="/products" component={Products} />
      </div>
    );
  }
}
