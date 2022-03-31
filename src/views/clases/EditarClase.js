import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../fontawesome";
import axios from "axios";
import FormCrear from "./FormCrear";

import UrlService from "../../services/UrlService";

class EditarClase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      api: UrlService.apiUrl(),
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
    var url = this.state.api+"/clases/" + id;
    axios.get(url).then((response) => {
      this.setState({
        clases: response.data,
        loading: false,
      });
    });
    // console.log(this.state.clases);
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
  

  ///////////////////
  render() {
    // var dias = [
    //   "Domingo",
    //   "Lunes",
    //   "Martes",
    //   "Miercoles",
    //   "Jueves",
    //   "Viernes",
    //   "Sabado",
    // ];
    // var daysOfWeek = dias[this.props.clase.daysOfWeek];
    

    // var {
    //   materia_id,
    //   responsable_id,
    //   ambiente_id,
    //   periodo_id,
    //   dia,
    // } = this.state.clases;
    return (
      <div>
        <div>
          <div className="tarjetas" style={{ borderColor: this.props.color }}>
            {/* <div className="tarjetas-titulo">Editar clase {id}</div> */}
            
            
            <FormCrear
              id={this.props.clase.id}
              clase={this.props.clase}
              evento={this.props.clase}
              index={this.props.index}
              getEventos={this.getEventos}
              menciones={this.props.menciones}
              hide={this.props.hide}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditarClase);
