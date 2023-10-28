import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Company {
  id: string;
  created: string;
  updated: string;
  title: string;
  email: string;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

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

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Companies</h1>
      <ul className="list-group">
        {companies && companies.length > 0 ? (
          companies.map((company) => (
            <li key={company.id} className="list-group-item">
              <Link to={`/companies/${company.id}`}>{company.title}</Link>
            </li>
          ))
        ) : (
          <li className="list-group-item">
            No companies have been registered yet ...
          </li>
        )}
      </ul>
    </div>
  );
};

export default Companies;
