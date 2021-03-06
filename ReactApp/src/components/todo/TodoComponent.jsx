import React, { Component } from "react";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class TodoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onSubmit(values) {
    let username = AuthenticationService.getLoggedinUser();

    let todo = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate,
    };
    if (this.state.id === -1) {
      TodoDataService.createTodo(username, todo).then(() => {
        this.props.history.push("/todos");
      });
    } else {
      TodoDataService.updateTodo(username, this.state.id, todo).then(() => {
        this.props.history.push("/todos");
      });
    }
  }

  validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter atleast 5 characters";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid date";
    }
    return errors;
  }

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    }
    // AuthenticationService.setupAxiosIntercepters();  when page is refreshed interceptors will not call.
    let username = AuthenticationService.getLoggedinUser();
    TodoDataService.retriveTodo(username, this.state.id).then((res) => {
      this.setState({
        description: res.data.description,
        targetDate: moment(res.data.targetDate).format("YYYY-MM-DD"),
      });
    });
  }

  render() {
    let { description, targetDate } = this.state;

    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />

                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  ></Field>
                </fieldset>
                <fieldset className="form-group">
                  <label>Traget Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
