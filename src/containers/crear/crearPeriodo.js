import React, { Component } from "react";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";
export default class CrearPeriodo extends Component {
  constructor(args) {
    super(args);
    this.state = {
      selected: {
        nombre: "default",
        gestion: "",
        start_date: "default",
        end_date: "default",
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
    var { nombre, gestion, start_date, end_date } = this.state.selected;
    var periodos = [
      { id: "I", nombre: "I" },
      { id: "II", nombre: "II" },
      { id: "Verano", nombre: "Verano" },
      { id: "Invierno", nombre: "Invierno" },
    ];
    return (
      <div className="formulario">
        {/* <div className="tarjeta-big"> */}
          <div className="tarjeta">
            <SelectControlado
              label="Nombre"
              value={nombre}
              name="nombre"
              handleChange={this.handleChange}
              datos={periodos}
            />
          </div>
          <div className="tarjeta">
            <InputControlado
              label="Gestión"
              nombre="gestion"
              valor={gestion}
              handleChange={this.handleChange}
            />
          </div>
          <div className="tarjeta">
            <InputControlado
              tipo="date"
              label="Inicio de Periodo"
              nombre="start_date"
              valor={start_date}
              handleChange={this.handleChange}
            />
          </div>
          <div className="tarjeta">
            <InputControlado
              tipo="date"
              label="Fin de Periodo"
              nombre="end_date"
              valor={end_date}
              handleChange={this.handleChange}
            />
          </div>
        {/* </div> */}
      </div>
    );
  }
}
