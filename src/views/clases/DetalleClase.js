import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../fontawesome";
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
    // this.verificarEntrada();
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
        <div>
          <div className="tarjetas" style={{ borderColor: color }}>
            {/* <div className="tarjetas-titulo">Detalle de clase</div> */}
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

                  <div className="tarjeta-peque">
                    {daysOfWeek} : {startTime} - {endTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="tarjeta-big">
              <div className="form-group">
                <div className="tarjetas">
                  <div className="tarjetas-titulo-col">Ambiente</div>
                  <div className="tarjeta-peque">{ambiente}</div>
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
