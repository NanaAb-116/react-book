import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/login/",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="alert"></div>

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="alert"></div>

        <div className="btns">
          <button type="submit" onClick={login}>
            Login
          </button>
        </div>
        <h6>
          Don't? have an account yet <Link to="/register">Register</Link>
        </h6>
      </form>
    </div>
  );
}

export default Login;
