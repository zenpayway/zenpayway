import { useState, useEffect } from "react";
import axios from "axios";
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
  company: Company;
  price: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

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

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Services</h1>

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
    </div>
  );
};

export default Services;
