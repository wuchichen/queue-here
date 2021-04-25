import "./Register.css";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import { Route, useHistory } from "react-router-dom";
import Ajax from "../../utils/ajax";
import { toast } from "react-toastify";

const Register = (props) => {
  const history = useHistory();

  function linkToRegisterDiner() {
    props.setRole("diner");
    history.push("/register/diner");
  }

  function linkToRegisterOwner() {
    props.setRole("owner");
    history.push("/register/owner");
  }

  function register(role, email, password, firstName, lastName) {
    var data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    Ajax.restCall(`http://localhost:8080/api/v1/register/${role}`, "post", {
      data: data,
    }).then((res) => {
      toast.success("Sucess");
      history.push(`/login/${role}`);
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const email = e.target.formBasicEmail.value;
    const password = e.target.formBasicPassword.value;
    const firstName = e.target.formBasicFirstName.value;
    const lastName = e.target.formBasicLastName.value;

    register(props.role, email, password, firstName, lastName);
  }

  return (
    <div className="Register">
      <div className="container">
        <ButtonGroup>
          <Button
            className={props.role === "diner" ? "btn-highlight-1" : ""}
            variant="outline-info"
            onClick={linkToRegisterDiner}
          >
            Diner
          </Button>
          <Button
            className={props.role === "owner" ? "btn-highlight-1" : ""}
            variant="outline-info"
            onClick={linkToRegisterOwner}
          >
            Shop Owner
          </Button>
        </ButtonGroup>

        <div className="p-2"></div>

        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="outline-info" type="submit">
            Register
          </Button>

          <Route path="/register">
            {history.push(`/register/${props.role}`)}
          </Route>
        </Form>
      </div>
    </div>
  );
};

export default Register;
