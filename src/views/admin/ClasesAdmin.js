import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";
import DetalleClase from "../clases/DetalleClase";

export default class ClasesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
    };
  }

  render() {
    const keys = [
      "estado",
      "title",
      "semestre",
      "nivel",
      "paralelo",
      "responsable",
      "ambiente",
      "daysOfWeek",
      "startTime",
      "endTime",
      "periodo",
    ];
    return (
      <div>
        <div >
        <DetalleClase />
          <ListaCore
            titulo="Clases"
            datos={this.props.clases}
            tipo="clases"
            keys={keys}
          />
          
        </div>
      </div>
    );
  }
}
