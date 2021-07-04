import React, { Component } from "react";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";
export default class CrearAmbiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambientes: [],
      selected: {
        nombre: "",
        tipo: "default",
        capacidad: "",
        edificio: "",
        piso: "",
        id: "",
        descripcion: " ",
      },
    };
  }
  componentDidMount() {
    this.setState({ selected: this.props.datos });
  }
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    this.props.onChange(evento);
  };
  render() {
    var { nombre, tipo, capacidad, descripcion } = this.state.selected;
    const tipos = [
      { id: "aula", nombre: "Aula" },
      { id: "laboratorio", nombre: "Laboratorio" },
      { id: "auditorio", nombre: "Auditorio" },
    ];
    return (
      <div className="tarjeta-big">
        <div className="tarjeta-peque">
          <InputControlado
            label="Nombre"
            nombre="nombre"
            valor={nombre}
            handleChange={this.handleChange}
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
        </div>
        <div className="tarjeta">
          <InputControlado
            label="Capacidad"
            tipo="number"
            nombre="capacidad"
            valor={capacidad}
            handleChange={this.handleChange}
          />
        </div>
        <div className="tarjeta">
          <InputControlado
            tipo="textarea"
            label="Descripción"
            nombre="descripcion"
            valor={descripcion}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
