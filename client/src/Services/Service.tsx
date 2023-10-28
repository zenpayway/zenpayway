import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
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
  price: number;
}

const Service: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(null);

  const fetchCompanyData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get<ServiceDetail>(
        `https://zenpayway-api.onrender.com/services/${id}`,
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
    fetchCompanyData();
  }, [id]);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Service Details</h1>
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
    </Container>
  );
};

export default Service;
