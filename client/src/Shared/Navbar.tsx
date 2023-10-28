import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const Navigation = () => {
  const token = sessionStorage.getItem("token");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = () => {
    sessionStorage.removeItem("token");
    setShowConfirmation(false);
    navigate("/login");
  };

  const handleSearch = async () => {
    if (search.trim() !== "") {
      try {
        const response = await axios.get(
          `https://zenpayway-api.onrender.com/companies/?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        if (response.data.results.length > 0) {
          // If one or more companies are found, redirect to the first one
          navigate(`/companies/${response.data.results[0].id}`);
        } else {
          // If no companies are found, return to the home page
          navigate("/");
        }
      } catch (error) {
        console.error("Error searching:", error);
      }
    }
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
                    Companies
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                  <Form className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                      variant="primary"
                      onClick={handleSearch}
                      style={{ marginLeft: "10px" }}
                    >
                      Search
                    </Button>
                  </Form>
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
