import React, { Component } from "react";
import HabilitarClases from "./HabiltarClases";
import UsuariosAdmin from "./UsuariosAdmin";

export default class HabilitarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
    };
  }
  componentDidMount() {
    console.group("users")
    console.log(this.props.usuarios);
    console.groupEnd()
  }

  render() {
    const { usuarios } = this.props;
    const keys = ["name", "email", "tipo", "estado"];
    return (
      <div>

        <HabilitarClases index={this.props.index} clases={this.props.clases} />
        <div className="border-bottom"/>
        <UsuariosAdmin usuarios={this.props.usuarios} responsables={this.props.responsables} />
      </div>
    );
  }
}
