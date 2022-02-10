import React, { Component } from "react";
import InputControlado from "../../components/InputControlado";

export default class CrearPensum extends Component {
  constructor(args) {
    super(args);
    this.state = {
      selected: {
        nombre: "default",
        descripcion: "",
      },
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.datos });
  }

  //manejador de eventos global
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    //Pasar el evento al padre
    this.props.onChange(evento);
    // console.log(name + " es: " + value);
  };
  render() {
    var { nombre, descripcion, } = this.state.selected;
    // var { startDate } = this.props
    return (
      <div className="tarjetas">
        <div className="tarjeta-big">
          <div className="tarjeta-peque">
            <InputControlado

              label="Nombre"
              nombre="nombre"
              valor={nombre}
              handleChange={this.handleChange}
            />
          </div>
          <div className="tarjeta-peque">
            <InputControlado
              tipo="textarea"
              label="Descripción"
              nombre="descripcion"
              valor={descripcion}
              handleChange={this.handleChange}
            />
          </div>

        </div>

      </div>
    );
  }
}
