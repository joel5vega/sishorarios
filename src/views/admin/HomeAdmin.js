import React, { Component } from "react";
import TabPanel from "../../components/Tabs";
import DatosAdmin from "./DatosAdmin";
import axios from "axios";
import HabilitarAdmin from "./HabilitarAdmin";
import EstadisticasAdmin from "./EstadisticasAdmin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faUserCog, faSignal } from '@fortawesome/free-solid-svg-icons'
import UrlService from "../../services/UrlService";


export default class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      api: UrlService.apiUrl(),
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    axios.get(this.state.api + "/users").then((response) => {
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
          
          label01={<div className="icon"><FontAwesomeIcon icon={faSignal} />.Reporte</div>}
          item01={<EstadisticasAdmin
            clases={this.props.index.clases}
          />}
          
          label02={<div className="icon"><FontAwesomeIcon icon={faUserCog} />Habilitar</div>}
          item02={<HabilitarAdmin
            usuarios={this.state.usuarios}
            responsables={this.props.index.responsables}
            index={this.props.index}
            clases={this.props.index.clases}
          />}

          label03={<div className="icon"><FontAwesomeIcon icon={faSlidersH} />Configuración</div>}
          item03={<DatosAdmin index={this.props.index} />}
          
        />
      </div>
    );
  }
}
