import React, { Component } from "react";
import Calendario from "../../components/Calendario";
import { withRouter } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "../../fontawesome";
import Fab from "@material-ui/core/Fab";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { Typography } from "@material-ui/core";
import axios from "axios";

class DetalleClase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      fuente: "http://localhost:8000/api/clases/",
      externo: false,
      clase: this.props.id,
      clases: {},
    };
  }

  componentDidMount() {
    this.verificarEntrada();
    // this.getDatos(this.state.clase);
  }
  getDatos(id) {
    var url = this.state.fuente + id;
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
      this.verificarEntrada();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
  }
  verificarEntrada() {
    var estado = this.props.location.state;
    this.setState({
      clase: this.props.id,
      clases: this.props.clase,
    });
    console.log(this.props.id);
    console.log(
      this.props.id.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

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

  ///////////////////
  render() {
    var { backgroundColor, title } = this.props.id;
    var startTime = this.props.id.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    var endTime = this.props.id.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    var {
      materia,
      paralelo,
      semestre,
      tipo,
      nivel,
      tituloResponsable,
      responsable,
      ambiente,
      tipoAmbiente,
      daysOfWeek,
      periodo,
    } = this.props.clase;
    return (
      <div>
        <div style={{ backgroundColor: { backgroundColor } }}>
          <div className="tarjetas">
            <div className="tarjetas-titulo">Detalle de clase</div>
            <div className="tarjeta-big">
              <div className="form-group">
                <div className="tarjetas-titulo-col">Materia</div>
                <div className="tarjeta-peque">{materia}</div>
                <div className="tarjetas">
                  <div className="tarjeta-peque">{title}</div>
                  <div className="tarjeta-peque">{paralelo}</div>
                </div>
                <div className="tarjetas">
                  <div className="tarjeta-peque">Semestre: {semestre}</div>
                  <div className="tarjeta-peque">{tipo}</div>
                  <div className="tarjeta-peque">{nivel}</div>
                </div>
              </div>
            </div>
            <div className="tarjeta-big">
              <div className="form-group">
                <div className="tarjetas-titulo-col">Docencia</div>
                {tituloResponsable} {responsable}
              </div>
            </div>

            <div className="tarjeta-big">
              <div className="form-group">
                <div className="tarjetas">
                  <div className="tarjetas-titulo-col">Horario</div>
                  <div className="tarjeta-peque">{daysOfWeek}</div>

                  <div className="tarjeta-peque">
                    {startTime} - {endTime}
                  </div>

                  <div className="tarjetas">
                    <div className="tarjetas-titulo-col">Ambiente</div>
                    <div className="tarjeta-peque">{ambiente}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DetalleClase);
