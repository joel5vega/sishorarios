import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../fontawesome";
import axios from "axios";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";
import CrearClase from "./crearClase";

class EditarClase extends Component {
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
    this.getDatos(this.props.clase.id);
  }
  getDatos(id) {
    var url = this.state.fuente + id;
    axios.get(url).then((response) => {
      this.setState({
        clases: response.data,
        loading: false,
      });
    });
    console.log(this.state.clases);
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
      id,
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

      // periodo,
    } = this.props.clase;

    var {
      materia_id,
      responsable_id,
      ambiente_id,
      periodo_id,
      dia,
    } = this.state.clases;
    return (
      <div>
        <div>
          <div className="tarjetas" style={{ borderColor: color }}>
            <div className="tarjetas-titulo">Editar clase {id}</div>
            <CrearClase index={this.props.index} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditarClase);
