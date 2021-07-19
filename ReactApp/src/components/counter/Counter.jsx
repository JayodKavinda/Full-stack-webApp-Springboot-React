import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Counter.css";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }
  render() {
    return (
      <div className="Counter">
        <CounterButton
          by={1}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          by={5}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />
        <CounterButton
          by={10}
          incrementMethod={this.increment}
          decrementMethod={this.decrement}
        />

        <span className="counter">{this.state.counter}</span>
        <div>
          <button className="reset" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  increment(by) {
    //console.log(`Increment by - ${by}`);
    this.setState(() => {
      return { counter: this.state.counter + by };
    });
  }

  decrement(by) {
    // console.log(`Increment by - ${by}`);
    this.setState(() => {
      return { counter: this.state.counter - by };
    });
  }

  reset() {
    this.setState(() => {
      return { counter: 0 };
    });
  }
}

class CounterButton extends Component {
  render() {
    return (
      <div className="Counter">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>
          +{this.props.by}
        </button>
        <button onClick={() => this.props.decrementMethod(this.props.by)}>
          -{this.props.by}
        </button>
      </div>
    );
  }

  // increment() {
  //   this.setState((preState) => {
  //     return { counter: preState.counter + this.props.by };
  //   });
  //   this.props.incrementMethod(this.props.by);
  // }

  // decrement() {
  //   this.setState((preState) => {
  //     return { counter: preState.counter - this.props.by };
  //   });
  //   this.props.decrementMethod(this.props.by);
  // }
}

CounterButton.defaultProps = {
  by: 1,
};

CounterButton.propsType = {
  by: PropTypes.number,
};

export default Counter;
