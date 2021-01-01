import React from "react";
import axios from "axios";
import SelectControlado from "../../components/SelectControlado";
//import "../../css/auth.css";
const Login = (props) => {
  const [name, email, tipo, responsable, setEmail] = React.useState("");
  const [setNombre, password, onChange, setPassword] = React.useState("");
  const tipos = [
    { id: "docente", nombre: "Docente" },
    { id: "administrativo", nombre: "Administrativo" },
  ];
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
      <h1>Registrar Nuevo</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            required
          />
        </div>
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
          <SelectControlado
            label="Tipo"
            value={tipo}
            name="tipo"
            datos={tipos}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <SelectControlado
            index="responsable"
            label="Responsable"
            value={responsable}
            name="tipo"
            datos={props.responsables}
            onChange={(e) => onChange(e.target.value)}
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
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Login;
