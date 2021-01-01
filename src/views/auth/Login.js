import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:8000/login", {
        // .post("https://api.sanctum.test/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <NavLink to="/register">
          <p>Registrar Nuevo usuario</p>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
