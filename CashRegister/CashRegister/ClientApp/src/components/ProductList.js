import React, { Component } from "react";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };

    fetch("api/products")
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data, loading: false });
      });
  }
  render() {
    return (
      <div>
        aaaaaaa
        {this.state.products.map(product => {
          <div>
            <h1>{product.name}</h1>
            <a>bruh</a>
          </div>;
        })}
      </div>
    );
  }
}

export default ProductList;
