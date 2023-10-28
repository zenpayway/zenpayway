import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  const token = sessionStorage.getItem("token");

  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          ZenPayway
        </Navbar.Brand>
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            {!token && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {token && (
              <>
                <Nav.Link as={Link} to="/companies">
                  Companies
                </Nav.Link>
                <Nav.Link as={Link} to="/services">
                  Services
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
