import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface CompanyData {
  id: number;
  created: string;
  updated: string;
  title: string;
  email: string;
}

const Company: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const fetchCompanyData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get<CompanyData>(
        `https://zenpayway-api.onrender.com/companies/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanyData(response.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Company Information</h1>
      {companyData && (
        <Card>
          <Card.Body>
            <Card.Text>
              <strong>Title:</strong> {companyData.title}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {companyData.email}
            </Card.Text>
            <Card.Text>
              <strong>Created:</strong> {new Date(companyData.created).toDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Updated:</strong> {new Date(companyData.updated).toDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {!companyData && <p>Loading company data...</p>}
    </Container>
  );
};

export default Company;
