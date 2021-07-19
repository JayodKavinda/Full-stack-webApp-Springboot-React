import axios from "axios";


class TodoDataService {
  retriveAllTodos(name) {
    return axios.get(`http://localhost:8080/users/${name}/todos`);
    // console.log("Exexute Service");
  }

  deleteTodo(name, id) {
    return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
  }

  retriveTodo(name, id) {
    return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    // console.log("Exexute Service");
  }

  updateTodo(name, id, todo) {
    return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
  }

  createTodo(name, todo) {
    return axios.post(`http://localhost:8080/users/${name}/todos/`, todo);
  }
}

export default new TodoDataService();
