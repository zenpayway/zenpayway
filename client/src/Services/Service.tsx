import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Company {
  id: number;
  created: string;
  updated: string;
  title: string;
  email: string;
}

interface ServiceDetail {
  id: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  user: number;
  company: Company;
  price: string;
}

const Service: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedService, setEditedService] = useState<ServiceDetail | null>(null);
  const navigate = useNavigate();

  const fetchServiceData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get<ServiceDetail>(
        `https://zenpayway-api.onrender.com/services/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServiceDetail(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [id]);

  const handleEditClick = () => {
    setShowEditModal(true);
    setEditedService(serviceDetail);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setEditedService(null);
  };

  const handleEditSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (editedService) {
        const response = await axios.put(
          `https://zenpayway-api.onrender.com/services/${editedService.id}/`,
          editedService,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        fetchServiceData();

        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (serviceDetail) {
        const response = await axios.delete(
          `https://zenpayway-api.onrender.com/services/${serviceDetail.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
  
        navigate("/services");
  
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };  

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Service Details</h1>
        {String(serviceDetail?.user) === sessionStorage.getItem("pk") && (
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleEditClick}>
              <i className="fa fa-cogs" aria-hidden="true"></i>
            </Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
          </div>
        )}
      </div>
      {serviceDetail && (
        <Card>
          <Card.Body>
            <Card.Text>
              <strong>Title:</strong> {serviceDetail.title}
            </Card.Text>
            <Card.Text>
              <strong>Description:</strong> {serviceDetail.description ? serviceDetail.description : "No description provided yet ..."}
            </Card.Text>
            <Card.Text>
              <strong>Company:</strong> {serviceDetail.company.title}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong> {serviceDetail.price} BGN
            </Card.Text>
            <Card.Text>
              <strong>Created:</strong> {new Date(serviceDetail.created).toDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Updated:</strong> {new Date(serviceDetail.updated).toDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {!serviceDetail && <p>Loading company data...</p>}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editedService?.title || ""}
                onChange={(e) => setEditedService({ ...editedService, title: e.target.value } as ServiceDetail)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={editedService?.description || ""}
                onChange={(e) => setEditedService({ ...editedService, description: e.target.value } as ServiceDetail)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={editedService?.price || ""}
                onChange={(e) => setEditedService({ ...editedService, price: e.target.value } as ServiceDetail)}
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
          Are you sure you want to delete the service:{" "}
          {serviceDetail ? serviceDetail.title : ""}
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
    </Container>
  );
};

export default Service;
