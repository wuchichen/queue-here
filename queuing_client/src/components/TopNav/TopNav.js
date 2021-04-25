import { Button, Navbar, Nav } from "react-bootstrap";
import "./TopNav.css";
import { useHistory, Link } from "react-router-dom";

const TopNav = (props) => {
  const history = useHistory();

  function linkToLogin() {
    history.push(`/login/${props.role}`);
  }

  function linkToRegister() {
    history.push(`/register/${props.role}`);
  }

  function logout() {
    props.logout();
    history.push(`/login/${props.role}`);
  }

  return (
    <div className="TopNav">
      <Navbar bg="dark" variant="dark">
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          QueueHere
        </Navbar.Brand>

        <Nav className="mr-auto">
          {props.loginStatus && props.role === "diner" && (
            <Nav.Link as={Link} to={`/dashboard/diner/bookings`}>
              Bookings
            </Nav.Link>
          )}

          {props.loginStatus && props.role === "owner" && (
            <Nav.Link as={Link} to={`/dashboard/owner/restaurants`}>
              Restaurants
            </Nav.Link>
          )}
        </Nav>

        {/* Login indicator */}
        <div className="loggedin-container">
          {props.loginStatus && (
            <>
              <Button variant="outline-info" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {!props.loginStatus && (
            <>
              <Button variant="outline-info" onClick={linkToRegister}>
                Sign Up
              </Button>

              <Button variant="outline-info" onClick={linkToLogin}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default TopNav;
