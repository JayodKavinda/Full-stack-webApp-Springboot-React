import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "jayodkavinda",
      password: "",
      hasLogginFailed: false,
      showSuccessMassage: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClick = this.loginClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  loginClick() {
    AuthenticationService.executeJWTAuthenticatedService(
      this.state.username,
      this.state.password
    )
      .then((res) => {
        AuthenticationService.registerSuccessfullLoginForJWT(
          this.state.username,
          res.data.token
        );
        this.props.history.push(`/welcome/${this.state.username}`);
        console.log(res.data);
      })
      .catch(() => {
        this.setState({ hasLogginFailed: true });
        this.setState({ showSuccessMassage: false });
      });

    // if (
    //   this.state.username === "jayodkavinda" &&
    //   this.state.password === "dummy"
    // ) {
    //   AuthenticationService.registerSuccessfullLogin(
    //     this.state.username,
    //     this.state.password
    //   );
    //   this.props.history.push(`/welcome/${this.state.username}`);
    //   //   this.setState({ showSuccessMassage: true });
    //   //   this.setState({ hasLogginFailed: false });
    // } else {
    //   this.setState({ hasLogginFailed: true });
    //   this.setState({ showSuccessMassage: false });
    // }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {this.state.hasLogginFailed && (
            <div className="alert alert-warning">Invalid Login</div>
          )}
          {/* {this.state.showSuccessMassage && <div>Succesfuly login</div>} */}
          Username:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:
          <input
            type="password"
            name="password"
            value={this.setState.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-success" onClick={this.loginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponets;
