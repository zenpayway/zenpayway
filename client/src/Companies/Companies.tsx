import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

interface Company {
  id: string;
  created: string;
  updated: string;
  title: string;
  email: string;
  user: number;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [editedCompany, setEditedCompany] = useState<Company | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ title: "", email: "", user: sessionStorage.getItem("pk") });

  const fetchCompanies = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const response = await axios.get<{ results: Company[] }>(
          "https://zenpayway-api.onrender.com/companies/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanies(response.data.results);
      } else {
        console.log("Token not found in sessionStorage");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleEditClick = (company: Company) => {
    setSelectedCompany(company);
    setEditedCompany({ ...company });
    setShowEditModal(true);
  };

  const handleDeleteClick = (company: Company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  const handleCreateClose = () => {
    setShowCreateModal(false);
  };

  const handleEditSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (editedCompany) {
        const response = await axios.put(
          `https://zenpayway-api.onrender.com/companies/${editedCompany.id}`,
          editedCompany,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Company updated:", response.data);

        // Update the state to reflect the changes
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company.id === editedCompany.id ? editedCompany : company
          )
        );

        // Close the edit modal
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating company:", error);
      // Handle the error here (e.g., show an error message)
    }
  };

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (selectedCompany) {
        const response = await axios.delete(
          `https://zenpayway-api.onrender.com/companies/${selectedCompany.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Company deleted:", response.data);

        // Update the state to remove the deleted company
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== selectedCompany.id)
        );

        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleCreateSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "https://zenpayway-api.onrender.com/companies/",
        newCompany,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Company created:", response.data);

      // Update the state to include the newly created company
      setCompanies((prevCompanies) => [...prevCompanies, response.data]);

      // Close the create modal
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating company:", error);
      // Handle the error here (e.g., show an error message)
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="list-group-item d-flex justify-content-between align-items-center">
        Companies
        <Button variant="success" onClick={handleCreateClick}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Button>
      </h1>

      <ul className="list-group">
        {companies && companies.length > 0 ? (
          companies.map((company) => (
            <li key={company.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/companies/${company.id}`}>{company.title}</Link>
              {String(company.user) === sessionStorage.getItem("pk") && (
                <div className="d-flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => handleEditClick(company)}>
                    <i className="fa fa-cogs" aria-hidden="true"></i>
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(company)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </Button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="list-group-item">
            No companies have been registered yet ...
          </li>
        )}
      </ul>

      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editedCompany?.title || ""}
                onChange={(e) => setEditedCompany({ ...editedCompany, title: e.target.value } as Company)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editedCompany?.email || ""}
                onChange={(e) => setEditedCompany({ ...editedCompany, email: e.target.value } as Company)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the company:{" "}
          {selectedCompany ? selectedCompany.title : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newCompany.title}
                onChange={(e) => setNewCompany({ ...newCompany, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newCompany.email}
                onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateSave}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Companies;
