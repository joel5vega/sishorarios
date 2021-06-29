import React, { Component } from "react";
import Calendario from "../../components/Calendario";
import BuscarClase from "./BuscarClase";
export default class HomeClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      datos: this.props.semestres,
      fuente: "",
      fuenteNow: "http://localhost:8000/api/clases/",
    };
  }
  componentDidMount() {}
  eventClick =(event)=>{
    console.log(event)
  }
  getDateClick = (event) => {
    let startTime = event.startTime;
    let day = event.day.toString();
    let date = event.date;
    let minutes = 90;
    let fin = new Date(date.getTime() + minutes * 60000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    // console.log(nuevo)
    var evento = [
      { title: "evento", daysOfWeek: day, startTime: startTime, endTime: fin },
    ];
    console.log(evento);
  };
  onClick = (e) => {
    //elaboramos la fuente de consulta
    const url = "http://localhost:8000/";
    var fuente =
      url + "api/clases/semestre/" + e.semestre + "?mencion=" + e.mencion_id;
    console.log(fuente);
    this.setState({ fuente: fuente });
  };
  onChange = (e) => {
    //elaboramos la fuente de consulta
    const url = "http://localhost:8000/";
    var fuente =
      url + "api/clases/semestre/" + e.semestre + "?mencion=" + e.mencion_id;
    console.log(fuente);
    this.setState({ fuente: fuente });
    alert(e);
  };

  render() {
    return (
      <div>
        <div className="tarjetas">
          <div className="col-8 border-right">
            <div className="tarjeta-titulo" id="print">
              Buscar horarios
            </div>
            <BuscarClase
              {...this.props}
              index={this.props.index}
              periodoActual={this.props.periodoActual}
              periodos={this.props.periodos}
              ambientes={this.props.ambientes}
              responsables={this.props.responsables}
              semestres={this.props.semestres}
              menciones={this.props.menciones}
              onChange={this.onChange}
            />
          </div>
          <div className="col-4" id="print">
            <div className="tarjeta-titulo">Actividades en curso</div>
            <Calendario
              fuente={this.state.fuenteNow}
              getDateClick={this.getDateClick}
              eventClick={this.eventClick}
              view="timeGrid"
            />
          </div>
        </div>
      </div>
    );
  }
}
