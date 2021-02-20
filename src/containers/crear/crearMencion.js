import React, { Component } from "react";
import InputControlado from "../../components/InputControlado";

export default class CrearMencion extends Component {
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
    var { nombre,descripcion } = this.state.selected;
  
    return (
      <div className="tarjetas">
        
        <div className="tarjeta">
          <InputControlado
            
            label="Nombre"
            nombre="nombre"
            valor={nombre}
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
