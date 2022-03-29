import React, { Component } from "react";
import EstadisticasAmbiente from "./EstadisticasAmbiente";
import Calendario from "../../components/Calendario";
// import UrlService from "../../services/UrlService";
export default class EstadisticasAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      // fuenteNow: UrlService.apiUrl()+"clases/",
      responsable: {},
      ambiente: {}
    };
   
  }
  eventClick(event){
    // console.log("hola",event)
  }
  getDateClick(date) {
    // console.log(date)
  }
  render() {
    var { docente_equivalente } = this.state.responsable;
    var {eventos} = this.props.clases;
    return (
      <div className="tarjeta-big">
        <div className="col border-right">

          <div className="tarjeta-titulo">Actividades en curso {eventos}</div>
          <Calendario
            // fuente={this.state.fuenteNow}
            fuente={this.props.clases}
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
