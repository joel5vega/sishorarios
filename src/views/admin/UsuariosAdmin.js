import React, { Component } from "react";

import ListaCore from "../../components/ListaCore";
export default class UsuariosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
    };
  }
  componentDidMount() {
    console.log(this.props.usuarios);
  }

  render() {
    const { usuarios } = this.props;
    const keys = ["name", "email", "tipo", "estado"];
    return (
      <div className="tarjetas">
        <ListaCore
          responsables={this.props.responsables}
          datos={usuarios}
          titulo="Usuarios"
          tipo="users"
          keys={keys}
        />
      </div>
    );
  }
}
