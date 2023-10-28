import { Routes, Route } from "react-router-dom";

import Navigation from "./Shared/Navbar";
import Home from "./Shared/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Logout from "./Auth/Logout";
import Companies from "./Companies/Companies";
import Company from "./Companies/Company";
import Services from "./Services/Services";
import Service from "./Services/Service";

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
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<Service />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;