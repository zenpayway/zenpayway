import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://zenpayway-api.onrender.com/auth/register/", {
        username,
        email,
        password1,
        password2,
      });
      const message = response.data.detail;
      console.log(message);

      navigate("/");
    } catch (error : any) {
      if (error && error.response && error.response.data) {
        let errorDetails = error.response.data;
        // Print out the 'data' object as a string
        if (errorDetails.password1) {
          setError(errorDetails.password1[0]);
        }
        else if (errorDetails.email) {
          setError(errorDetails.email[0]);
        }
        else {
          setError("Registration failed. Please check your information and try again.");
        }
      }
      else {
        setError("Registration failed. Please check your information and try again.");
      }
      
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
