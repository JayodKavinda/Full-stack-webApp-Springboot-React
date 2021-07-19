import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService.js";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage: "",
    };
    this.retriveWelcomeMessage = this.retriveWelcomeMessage.bind(this);
    this.handleSuccessfullResponse = this.handleSuccessfullResponse.bind(this);
    this.handleErros = this.handleErros.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.match.params.name}.You can manage your todos{" "}
          <Link to="/todos">here</Link>
        </div>

        <div className="container">
          Click here to get customized welcome massage.{" "}
          <button
            className="btn btn-success"
            onClick={this.retriveWelcomeMessage}
          >
            Get Welcome Massage
          </button>
        </div>
        <div className="container">{this.state.welcomeMessage}</div>
      </div>
    );
  }

  retriveWelcomeMessage() {
    HelloWorldService.executeHelloWorldPathVarService(
      this.props.match.params.name
    )
      .then((response) => this.handleSuccessfullResponse(response))
      .catch((err) => this.handleErros(err));
  }

  handleSuccessfullResponse(res) {
    console.log(res);

    this.setState({ welcomeMessage: res.data.message });
  }

  handleErros(error) {
    console.log(error.response);
    let errorMessage = "";
    if (error.message) {
      errorMessage += error.message;
    }
    if (error.response && error.response.data) {
      errorMessage += error.response.data.message;
    }
    this.setState({ welcomeMessage: errorMessage });
  }
}

export default WelcomeComponent;
