import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <span>Loading...</span>
    ) : (
      <div>
        <h3>List of Products</h3>
        {this.state.products.map(product => {
          return (
            <div className="product">
              <div>
                <h2>Name: {product.name}</h2>
                <span>Barcode: {product.barcode}</span>
                <br />
                <span>Price: {product.priceWithTax}</span>
                <br />
                <span>Tax Type: {product.type}</span>
                <br />
                <span>Available Amount: {product.availableAmount}</span>
                <br />
                <Link
                  className="edit-button"
                  to={`/products/edit/${product.id}`}
                >
                  Edit
                </Link>
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
