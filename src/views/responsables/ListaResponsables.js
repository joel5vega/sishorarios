import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";

export default class ListaResponsables extends Component {
  render() {
    var { datos } = this.props;
    var keys = ["nombre","ap_paterno","ap_materno","puesto","titulo","descripcion"]
    return (
      <div>
        {/* <h1>Lista de Responsables</h1> */}
        <ListaCore titulo="Responsable" datos={datos} tipo="responsable" keys={keys} />
      </div>
    );
  }
}
