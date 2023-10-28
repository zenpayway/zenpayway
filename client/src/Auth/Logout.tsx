import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
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
    <div>
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>

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
    </div>
  );
};

export default Logout;
