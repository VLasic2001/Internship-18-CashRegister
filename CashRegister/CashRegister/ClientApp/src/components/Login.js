import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { cashiers: [], loading: true };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/api/cashiers/all").then(response => {
      this.setState({
        cashiers: response.data,
        loading: false
      });
    });
  }

  handleSubmit() {
    let password = this.refs.password.value;
    axios
      .get("/api/cashiers/login", {
        params: { password }
      })
      .then(response => {
        localStorage.setItem("cashierId", response.data);
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div>
        <h2>Enter Cashier Password</h2>
        <input ref="password" />
        <button onClick={() => this.handleSubmit()}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
