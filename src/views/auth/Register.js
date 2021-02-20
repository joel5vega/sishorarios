import React, { Component } from "react";
import axios from "axios";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { tipo: "default", responsable: "default" },
    };
  }
  componentDidMount() {
    //recibimos el dato desde props
    this.setState({ selected: this.props.datos });
  }
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    this.props.onChange(evento);
    console.log(name + " es: " + value);
  };

  async handleFormSubmit(event) {
    event.preventDefault();
    var {
      name,
      email,
      password,
      c_password,
      tipo,
      responsable,
    } = this.state.selected;
    console.log(this.state.selected);
    var url =
      "http://localhost:8000/api/register?email=" +
      email +
      "&name=" +
      name +
      "&password=" +
      password +
      "&c_password=" +
      c_password +
      "&tipo=" +
      tipo +
      "&responsable=" +
      responsable;

    axios.post(url).then((response) => {
      console.log(response);
      alert("Registro exitoso");
      this.props.history.push("/");
    });
  }
  render() {
    var {
      name,
      email,
      tipo,
      responsable,
      password,
      c_password,
    } = this.state.selected;

    const tipos = [
      { id: "docente", nombre: "Docente" },
      { id: "administrativo", nombre: "Administrativo" },
    ];
    return (
      <div className="container">
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <div className="tarjetas">
            <div className="tarjeta">
              <InputControlado
                label="Nombre"
                nombre="name"
                valor={name}
                handleChange={this.handleChange}
              />
            </div>
            <div className="tarjeta">
              <InputControlado
                label="Correo electronico"
                nombre="email"
                valor={email}
                handleChange={this.handleChange}
              />
            </div>
            <div className="tarjeta">
              <InputControlado
                type="password"
                label="Contraseña"
                value={password}
                onChange={this.handleChange}
              />
              <InputControlado
                type="password"
                label="Confirme la Contraseña"
                value={c_password}
                onChange={this.handleChange}
              />
            </div>
            <div className="tarjeta">
              <SelectControlado
                label="Tipo"
                value={tipo}
                name="tipo"
                handleChange={this.handleChange}
                datos={tipos}
              />

              {this.state.selected.tipo === "docente" && (
                <SelectControlado
                  label="Responsable"
                  value={responsable}
                  name="responsable"
                  handleChange={this.handleChange}
                  datos={this.props.responsables}
                />
              )}
            </div>
          </div>

          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">
              Registrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
