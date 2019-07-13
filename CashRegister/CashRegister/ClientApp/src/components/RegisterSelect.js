import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class RegisterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { registers: [], loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/api/registers/all").then(response => {
      this.setState({
        registers: response.data,
        loading: false
      });
    });
  }

  handleSubmit() {
    localStorage.setItem("registerId", this.refs.id.value);
    this.props.history.push("/");
  }

  render() {
    let content = this.state.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h2>Select Register Id</h2>
        <select ref="id">
          {this.state.registers.map(register => {
            return <option>{register.id}</option>;
          })}
        </select>
        <button onClick={() => this.handleSubmit()}>Login</button>
      </div>
    );
    return <div>{content}</div>;
  }
}

export default withRouter(RegisterSelect);
