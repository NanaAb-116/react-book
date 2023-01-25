import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/auth/register/", {
        email,
        name,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <h1>Create Account</h1>

        <input
          type="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="alert"></div>

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
          <button type="submit" onClick={registerUser}>
            Create Account
          </button>
        </div>
        <h6>
          Already have an account? <Link to="/login">login</Link>
        </h6>
      </form>
    </div>
  );
}

export default Register;
