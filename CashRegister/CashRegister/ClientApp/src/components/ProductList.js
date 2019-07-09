import React, { Component } from "react";
import axios from "axios";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], loading: true, selectedProduct: null };
  }

  componentDidMount() {
    axios.get("/api/products/all").then(response => {
      this.setState({
        products: response.data,
        loading: false
      });
    });
  }

  render() {
    let content = this.state.loading ? (
      <span>Loading................</span>
    ) : (
      <div>
        <h3>List of Products</h3>
        {this.state.products.map(product => {
          return <h1 key={product}>{product.name}</h1>;
        })}
      </div>
    );
    return <div>{content}</div>;
  }
}

export default ProductList;
