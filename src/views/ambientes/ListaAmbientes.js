import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";

export default class ListaAmbientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: this.props,
    };
  }
  render() {
    var { datos } = this.props;
    var keys = ["nombre", "tipo", "capacidad"];
    return (
      <div>
        <ListaCore datos={datos} titulo="Ambientes" tipo="ambiente" keys={keys} />
      </div>
    );
  }
}
