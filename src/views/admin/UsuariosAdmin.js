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
    console.group("users")
    console.log(this.props.usuarios);
    console.groupEnd()
  }

  render() {
    const { usuarios } = this.props;
    const keys = ["name", "email", "tipo", "estado"];
    return (
      <div >
        <ListaCore
          responsables={this.props.responsables}
          datos={usuarios}
          titulo="Usuarios"
          tipo="users"
          keys={keys}
          menciones={[]}
          pensums={[]}
        />

      </div>
    );
  }
}
