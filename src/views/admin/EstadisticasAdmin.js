import React, { Component } from "react";
import EstadisticasAmbiente from "./EstadisticasAmbiente";
import Calendario from "../../components/Calendario";
import UrlService from "../../services/UrlService";
export default class EstadisticasAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      fuenteNow: UrlService.apiUrl()+"clases/",
      responsable: {},
      ambiente: {}
    };
  }

  render() {
    var { docente_equivalente } = this.state.responsable;
    return (
      <div className="tarjeta-big">
        <div className="col border-right">

          <div className="tarjeta-titulo">Actividades en curso</div>
          <Calendario
            fuente={this.state.fuenteNow}
            getDateClick={this.getDateClick}
            eventClick={this.eventClick}
            view="timeGrid"
          />

        </div>
        <div className="col">
          <EstadisticasAmbiente datos={this.state.ambiente} />
        </div>
        {docente_equivalente}
      </div>
    );
  }
}
