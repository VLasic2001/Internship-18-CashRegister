import React, { Component } from "react";
import { Route } from "react-router";
import AddReceipt from "./AddReceipt";
// import EditReceipt from "./EditReceipt";
import ReceiptList from "./ReceiptList";

class Receipts extends Component {
  render() {
    return (
      <div>
        <Route exact path="/receipts" component={ReceiptList} />
        <Route path="/receipts/add" component={AddReceipt} />
        {/* <Route path="/receipts/edit/:id" component={EditReceipt} /> */}
      </div>
    );
  }
}

export default Receipts;
