import React, { Component } from "react";
import { Route } from "react-router";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductList from "./ProductList";

class Products extends Component {
  render() {
    return (
      <div>
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/add" component={AddProduct} />
        <Route path="/products/edit/:id" component={EditProduct} />
      </div>
    );
  }
}

export default Products;
