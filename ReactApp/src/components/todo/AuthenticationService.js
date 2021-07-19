import axios from "axios";

export const USERNAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {
  executeBasicAuthenticatedService(username, password) {
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return axios.get("http://localhost:8080/basicauth", {
      headers: { authorization: basicAuthHeader },
    });
  }

  executeJWTAuthenticatedService(username, password) {
    // let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return axios.post("http://localhost:8080/authenticate", {
      username,
      password,
    });
  }
  registerSuccessfullLogin(username, password) {
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosIntercepters(basicAuthHeader);
  }

  registerSuccessfullLoginForJWT(username, token) {
    let tokenString = "Bearer " + token;
    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem("token", token);
    this.setupAxiosIntercepters(tokenString);
  }

  logout() {
    sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedinUser() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return "";
    return user;
  }

  setupAxiosIntercepters(token) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization =
          "Bearer " + sessionStorage.getItem("token");
      }
      return config;
    });
  }
}

export default new AuthenticationService();
