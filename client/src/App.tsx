import { Routes, Route } from "react-router-dom";

import Navigation from "./Shared/Navbar";
import Home from "./Shared/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Logout from "./Auth/Logout";
import Companies from "./Companies/Companies";
import Company from "./Companies/Company";
import RegistrationSuccess from './Shared/RegistrationSuccess'
import Services from "./Services/Services";
import Service from "./Services/Service";
import EmailConfirmed from "./Shared/EmailConfirmed";

const App = () => {
  return (
    <div>
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<Company />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<Service />} />
          <Route path="/email-verified" element={<EmailConfirmed />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;