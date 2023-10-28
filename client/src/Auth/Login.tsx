import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://zenpayway-api.onrender.com/auth/login/", {
        email,
        password,
      });
      const token = response.data.access;
      sessionStorage.setItem("token", token);

      const pk = response.data.user.pk
      sessionStorage.setItem("pk", pk);
      navigate("/");
    } catch (error : any) {
        if (error && error.response && error.response.data) {
            let errorDetails = error.response.data;
            console.log(errorDetails);
            if (errorDetails.non_field_errors) {
              setError(errorDetails.non_field_errors[0]);
            }
            else {
              setError("Login failed. Please check your email and password.");
            }
        }
        else {
          setError("Login failed. Please check your email and password.");
        }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
