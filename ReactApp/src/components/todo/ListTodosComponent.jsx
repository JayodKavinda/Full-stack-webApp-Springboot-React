import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from "moment";

class ListTodosComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      message: null,
    };

    this.deleteTodo = this.deleteTodo.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos() {
    let username = AuthenticationService.getLoggedinUser();
    TodoDataService.retriveAllTodos(username).then((res) => {
      this.setState({ todos: res.data });
    });
  }

  deleteTodo(id) {
    let username = AuthenticationService.getLoggedinUser();
    TodoDataService.deleteTodo(username, id).then((res) => {
      this.setState({ message: `Delete of todo ${id} is successful` });
      this.refreshTodos();
    });
  }

  updateTodo(id) {
    this.props.history.push(`/todos/${id}`);
  }

  addTodo() {
    this.props.history.push(`/todos/-1`);
  }
  render() {
    return (
      <div className="container">
        <h1>List Todos</h1>
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Description</th>
                <th>Is Completed</th>
                <th>Traget Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <th>{todo.description}</th>
                  <th>{todo.done.toString()}</th>
                  <th>{moment(todo.targetDate).format("YYYY/MM/DD")}</th>
                  <th>
                    <button
                      onClick={() => this.updateTodo(todo.id)}
                      className="btn btn-success"
                    >
                      Update
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => this.deleteTodo(todo.id)}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.addTodo}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTodosComponent;
