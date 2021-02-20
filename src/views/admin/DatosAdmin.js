import React, { Component } from "react";
// import Lista from "../../components/Lista";
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
    const keyMencion = ["nombre", "gestion", "start_date", "end_date"];
    return (
      <div>
        
        Datos Admin
        <div className="tarjetas">
          <ListaCore
            datos={index.periodos}
            titulo="Periodos"
            tipo="periodo"
            keys={keyMencion}
          />
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
