import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import TopNav from "./components/TopNav/TopNav";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Diner from "./modules/Diner/Diner";
import Owner from "./modules/Owner/Owner";
import AuthService from "./utils/AuthService";

const App = () => {
  // login status
  const [loginStatus, setLoginStatus] = useState(() => {
    return AuthService.isLogin();
  });

  function login(_role, _email, _password) {
    return AuthService.login(_role, _email, _password)
      .then((res) => {
        setRole(AuthService.getRole());
        setLoginStatus(true);
        return res;
      })
      .catch((err) => {
        setLoginStatus(false);
        throw err;
      });
  }

  function logout() {
    AuthService.logout();
    setLoginStatus(false);
  }

  // role
  const [role, setRole] = useState(() => {
    const tempRole = AuthService.getRole();
    return tempRole ? tempRole : "diner";
  });

  return (
    <div className="App">
      {/* toaster */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* top navigation bar */}
      <div className="q-topnav">
        <TopNav logout={logout} loginStatus={loginStatus} role={role}></TopNav>
      </div>

      {/* main content */}
      <main className="q-main">
        <div
          className="bg-main"
          style={{ backgroundImage: `url("/bg.jpg")` }}
        ></div>

        <div className="container">
          <Switch>
            <Route exact path="/">
              <h3>
                <i>
                  <b>QueueHere </b>
                </i>
                &ndash; reduces your time spending for queuing.
              </h3>
            </Route>

            {/* protected route */}
            <Route path="/dashboard/diner">
              {loginStatus ? (
                <Diner></Diner>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            {/* protected route */}
            <Route path="/dashboard/owner">
              {loginStatus ? (
                <Owner></Owner>
              ) : (
                <Redirect to="/login"></Redirect>
              )}
            </Route>

            <Route path="/login">
              <Login
                login={login}
                loginStatus={loginStatus}
                role={role}
                setRole={setRole}
              ></Login>
            </Route>

            <Route path="/register">
              <Register
                loginStatus={loginStatus}
                role={role}
                setRole={setRole}
              ></Register>
            </Route>
          </Switch>
        </div>
      </main>

      {/* footer */}
      <footer className="q-footer">
        <i>Copyright &copy; QueueHere</i>
      </footer>
    </div>
  );
};

export default App;
