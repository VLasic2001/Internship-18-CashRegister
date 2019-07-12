import React, { Component } from "react";
import { Route } from "react-router";
import AddReceipt from "./AddReceipt";
import ReceiptDetails from "./ReceiptDetails";
import ReceiptList from "./ReceiptList";

class Receipts extends Component {
  render() {
    return (
      <div>
        <Route exact path="/receipts" component={ReceiptList} />
        <Route path="/receipts/add" component={AddReceipt} />
        <Route path="/receipts/details/:id" component={ReceiptDetails} />
      </div>
    );
  }
}

export default Receipts;
