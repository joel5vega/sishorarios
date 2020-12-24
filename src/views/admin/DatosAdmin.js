import React, { Component } from "react";
import Lista from "../../components/Lista";
import ListaCore from "../../components/ListaCore";

export default class DatosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
    };
  }

  render() {
    const { index } = this.props;
    const key = ["nombre"];
    return (
      <div>
        Datos Admin
        <div className="tarjetas">
          <ListaCore
            datos={index.pensums}
            titulo="Pensums"
            tipo="pensum"
            keys={key}
          />
          <ListaCore
            datos={index.menciones}
            titulo="Menciones"
            tipo="mencion"
            keys={key}
          />
        </div>
      </div>
    );
  }
}
