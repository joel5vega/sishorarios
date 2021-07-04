import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";

export default class ListaResponsables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: this.props.datos
    }
  }

  render() {
    var { datos } = this.state;
    var keys = ["titulo", "nombre", "ap_paterno", "ap_materno", "puesto"]
    return (
      <div>
        <ListaCore titulo="Responsable" datos={datos} tipo="responsable" keys={keys} />
      </div>
    );
  }
}
