import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Company {
  id: number;
  created: string;
  updated: string;
  title: string;
  email: string;
}

interface Service {
  id: string;
  created: string;
  updated: string;
  title: string;
  description: string;
  user: number;
  company: number;
  price: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: 0,
    user: sessionStorage.getItem("pk"),
    company: "",
  });

  const fetchServices = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const response = await axios.get<{ results: Service[] }>(
          "https://zenpayway-api.onrender.com/services/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServices(response.data.results);
      } else {
        console.log("Token not found in sessionStorage");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

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
    fetchServices();
    fetchCompanies();
  }, []);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateClose = () => {
    setShowCreateModal(false);
  };

  const handleCreateSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "https://zenpayway-api.onrender.com/services/",
        newService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Service created:", response.data);

      fetchServices();

      setShowCreateModal(false);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Service Details</h1>
        <Button variant="success" onClick={handleCreateClick}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </Button>
      </div>

      <ul className="list-group">
        {services && services.length > 0 ? (
          services.map((service) => (
            <li key={service.id} className="list-group-item">
              <div className="row">
                <div className="col-sm-4">
                  <Link to={`/services/${service.id}`}>{service.title}</Link>
                </div>
                <div className="col-sm-4">
                  <Link to={`/companies/${service.company.id}`}>{service.company.title}</Link>
                </div>
                <div className="col-sm-4">
                  {service.price} BGN
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            No services have been registered yet ...
          </li>
        )}
      </ul>

      <Modal show={showCreateModal} onHide={handleCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                as="select"
                value={newService.company}
                onChange={(e) => setNewService({ ...newService, company: e.target.value })}
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.title}
                  </option>
                ))}
              </Form.Control>
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

export default Services;
