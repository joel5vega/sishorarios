import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faClock, faTimes, faUniversity, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

class DetalleClase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: "https://sishorarios.azurewebsites.net/public/api/",
      // url: "http://localhost:8000/api/",
      externo: false,
      clase: this.props.id,
      clases: {},
    };
  }

  componentDidMount() {
    // this.verificarEntrada();
    // this.getDatos(this.state.clase);
  }
  getDatos(id) {
    var url = this.state.url + "clases/" + id;
    axios.get(url).then((response) => {
      this.setState({
        clases: response.data,
        loading: false,
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
      // this.verificarEntrada();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
  }
  /*
  verificarEntrada() {
    var estado = this.props.location.state;
    this.setState({
      clase: this.props.id,
      clases: this.props.clase,
    });
    console.log(this.props.id);

    if (estado) {
      // console.log(estado);
      this.setState({
        clase: estado.clase,
        titulo: estado.titulo,
        externo: true,
        clases: {},
      });
    } else {
      console.log("no llego");
    }
  }
*/
  ///////////////////
  render() {
    var dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    var daysOfWeek = dias[this.props.clase.daysOfWeek];
    var {
      color,
      materia,
      paralelo,
      semestre,
      tipo,
      nivel,
      tituloResponsable,
      responsable,
      ambiente,
      startTime,
      endTime,
      title,
      // tipoAmbiente,
      // daysOfWeek,
      // periodo,
    } = this.props.clase;
    return (
      <div>
        <div className="informacion">
          <div className="itemPrincipal">
            <div className="itemTitulo">
              <FontAwesomeIcon icon={faBookReader} /> <b> Materia</b>
            </div>
            <div className="itemInfo">
              {title} {paralelo}
            </div>
            <div className="itemInfo">
              {materia}
            </div>
            <div className="itemInfo"><b>Tipo: </b> {tipo}</div>
            <div className="itemInfo">
              <b>Semestre: </b> {semestre}
            </div>
          </div>
          <div className="itemSecundario">
            <div className="itemTitulo">
              <FontAwesomeIcon icon={faClock} />
              Horario
            </div>
            <div className="itemInfo">
              <b>{daysOfWeek} :</b>
            </div>
            <div className="itemInfo">
              {startTime} - {endTime}
            </div>
          </div>
          <div className="itemSecundario">
            <div className="itemTitulo">
              <FontAwesomeIcon icon={faUserGraduate} />
              Docencia
            </div>

            <div className="itemInfo">
              {tituloResponsable}. {responsable}
            </div>

          </div>
          <div className="itemSecundario">
            <div className="itemTitulo">
              <FontAwesomeIcon icon={faUniversity} />
              <b>Ambiente</b>
            </div>


            <div className="itemInfo">
              {ambiente}
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default withRouter(DetalleClase);
