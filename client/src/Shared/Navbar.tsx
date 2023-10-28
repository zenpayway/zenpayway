import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Modal, Button } from "react-bootstrap";

const Navigation = () => {
  const token = sessionStorage.getItem("token");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    sessionStorage.removeItem("token");
    setShowConfirmation(false);
    navigate("/login");
  };

  return (
    <>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Yes, Logout
          </Button>
        </Modal.Footer>
      </Modal>

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
                  <Nav.Link as={Link} to="/services">
                    Services
                  </Nav.Link>
                  <Nav.Link as={Link} to="/companies">
                    My Companies
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Navigation;
