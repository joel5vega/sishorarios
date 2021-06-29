import React, { Component } from "react";
import TabPanel from "../../components/Tabs";
import DatosAdmin from "./DatosAdmin";
import UsuariosAdmin from "./UsuariosAdmin";
import axios from "axios";
import HabilitarClases from "./HabiltarClases";

export default class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url:'http://localhost:8000'
    };
  }
  componentDidMount() {
    this.getUsers();
  }
  getUsers() {
    axios.get(this.state.url + "/api/users").then((response) => {
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
          label01="Datos del sistema"
          label02="Usuarios"
          label03="Habilitar Clases"
          item01={<DatosAdmin index={this.props.index} />}
          item02={<UsuariosAdmin usuarios={this.state.usuarios} responsables={this.props.index.responsables}/>}
          item03={<HabilitarClases clases={this.props.index.clases}/>}
        />
      </div>
    );
  }
}
