import React, { Component } from "react";
import Lista from "../../components/Lista";

export default class ListaAmbientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: this.props,
    };
  }
  render() {
    var { datos } = this.props;
    return (
      <div>
        <Lista datos={datos} titulo="Lista de Ambientes" tipo="ambiente" />
      </div>
    );
  }
}
