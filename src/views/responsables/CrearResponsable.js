import React, { Component } from "react";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";

export default class CrearResponsable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }
  componentDidMount() {
    //recibimos el dato desde props
    // this.setState({selected:this.props})
  }
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    // Propagar datos al padre
    this.props.onChange(evento);
  };

  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    console.log(name + " es: " + value);
  };

  render() {
    const puestos = [
      { valor: "auxiliar", nombre: "Auxiliar", id: 1 },
      { valor: "docente", nombre: "Docente", id: 2 },
    ];
    const titulos = [
      { valor: "univ", nombre: "Univ.", id: 1 },
      { valor: "ing", nombre: "Ing", id: 2 },
    ];

    var {
      nombre,
      ap_paterno,
      ap_materno,
      puesto,
      titulo,
      descripcion,
    } = this.state.selected;
    return (
      <div className="container">
        <InputControlado
          label="Nombre"
          nombre="nombre"
          valor={nombre}
          handleChange={this.handleChange}
        />
        <InputControlado
          label="Apellido Paterno"
          nombre="ap_paterno"
          valor={ap_paterno}
          handleChange={this.handleChange}
        />
        <InputControlado
          label="Apellido Materno"
          nombre="ap_materno"
          valor={ap_materno}
          handleChange={this.handleChange}
        />
        <SelectControlado
          label="Puesto"
          value={puesto}
          name="puesto"
          handleChange={this.handleChange}
          datos={puestos}
        />
        <SelectControlado
          label="Titulo"
          value={titulo}
          name="titulo"
          handleChange={this.handleChange}
          datos={titulos}
        />
        <div className="form-group col-auto">
          <label className="col-6">Biografia</label>
          <textarea
            name="descripcion"
            value={descripcion}
            onChange={this.handleChange}
          ></textarea>
        </div>
      </div>
    );
  }
}
