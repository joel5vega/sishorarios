import React, { Component } from "react";
import TabPanel from "../../components/Tabs";
import DatosAdmin from "./DatosAdmin";
import axios from "axios";
import HabilitarAdmin from "./HabilitarAdmin";
import EstadisticasAdmin from "./EstadisticasAdmin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSlidersH, faUserCog,  faSignal } from '@fortawesome/free-solid-svg-icons'
import UrlService from "../../services/UrlService";


export default class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: UrlService.apiUrl(),
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    axios.get(this.state.url + "users").then((response) => {
      this.setState({
        usuarios: response.data,
        loading: false,
      });
    });
  }
  render() {
    return (
      <div>
        <TabPanel
          label03={<div className="icon"><FontAwesomeIcon icon={faSlidersH} />Configuración</div>}
          label02={<div className="icon"><FontAwesomeIcon icon={faUserCog} />Habilitar</div>}
          label01={<div className="icon"><FontAwesomeIcon icon={faSignal} />.Reporte</div>}
          item03={<DatosAdmin index={this.props.index} />}
          item02={<HabilitarAdmin
            usuarios={this.state.usuarios}
            responsables={this.props.index.responsables}
            index={this.props.index}
            clases={this.props.index.clases}

          />}
          item01={<EstadisticasAdmin 
            clases={this.props.index.clases}
            />}
        />
      </div>
    );
  }
}
