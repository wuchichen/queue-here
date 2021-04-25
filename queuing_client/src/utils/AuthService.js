import Ajax from "./ajax";
import jwt_decode from "jwt-decode";

const isLogin = () => {
  const result = localStorage.getItem("jwt") ? true : false;
  return result;
};

const getJWT = () => {
  return localStorage.getItem("jwt");
};

/**
 *
 * @param {"diner" | "owner"} role target role
 * @param {String} email user email
 * @param {String} password user password
 * @returns {Promise<any>} http response
 */
const login = async (role, email, password) => {
  return Ajax.restCall(`http://localhost:8080/api/v1/login/${role}`, "post", {
    data: { email: email, password: password },
  }).then((res) => {
    localStorage.setItem("jwt", res.access_token);
    return res;
  });
};

const logout = () => {
  localStorage.removeItem("jwt");
};

const getRole = () => {
  var jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return;
  }
  var decoded = jwt_decode(jwt);
  return decoded.role;
};

const AuthService = {
  isLogin,
  getJWT,
  login,
  logout,
  getRole,
};

export default AuthService;
