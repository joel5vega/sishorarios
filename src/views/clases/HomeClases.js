import React, { Component } from "react";
import Calendario from "../../components/Calendario";

export default class HomeClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      fuente: "http://127.0.0.1:8000/api/clases",
      externo: false,
    };
  }

  componentDidMount() {
    this.verificarEntrada();
  }
  verificarEntrada() {
    var estado = this.props.location.state;
    if (estado) {
      console.log(estado);
      this.setState({ fuente: estado.fuente, externo: true });
    } else {
      console.log("no llego");
    }
  }

  render() {
    return (
      <div>
        <h1>Home Clase</h1>
        {this.state.externo && <p>LLego</p>}
        <Calendario fuente={this.state.fuente} />
      </div>
    );
  }
}
