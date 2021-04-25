import "./Login.css";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();

  function linkToDinerLogin() {
    props.setRole("diner");
    history.push("/login/diner");
  }

  function linkToOwnerLogin() {
    props.setRole("owner");
    history.push("/login/owner");
  }

  function login(role, email, password) {
    props.login(role, email, password).then((res) => {
      if (role === "diner") {
        history.push(`/dashboard/diner/bookings`);
      } else if (role === "owner") {
        history.push(`/dashboard/owner/restaurants`);
      }
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;

    login(props.role, email, password);
  }

  return (
    <div className="Login">
      <div className="container">
        <ButtonGroup>
          <Button
            className={props.role === "diner" ? "btn-highlight-1" : ""}
            variant="outline-info"
            onClick={linkToDinerLogin}
          >
            Diner
          </Button>
          <Button
            className={props.role === "owner" ? "btn-highlight-1" : ""}
            variant="outline-info"
            onClick={linkToOwnerLogin}
          >
            Shop Owner
          </Button>
        </ButtonGroup>

        <div className="p-2"></div>

        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="outline-info" type="submit">
            Login
          </Button>

          <Route path="/login">{history.push(`/login/${props.role}`)}</Route>
        </Form>
      </div>
    </div>
  );
};

export default Login;
