import axios from "axios";

class HelloWorldService {
  executeHelloWorldService() {
    return axios.get("http://localhost:8080/hello-world");
    // console.log("Exexute Service");
  }

  executeHelloWorldBeanService() {
    return axios.get("http://localhost:8080/hello-world-bean");
    // console.log("Exexute Service");
  }
  executeHelloWorldPathVarService(name) {
    return axios.get(`http://localhost:8080/hello-world/path/${name}`);
    // console.log("Exexute Service");
  }
}

export default new HelloWorldService();
