import React, { Component } from "react";
import Calendario from "../../components/Calendario";

export default class ViewClases extends Component {
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
      this.setState({
        fuente: estado.fuente,
        titulo: estado.titulo,
        externo: true,
      });
    } else {
      console.log("no llego");
    }
  }

  render() {
    return (
      <div>
        {this.state.externo && <h1>{this.state.titulo}</h1>}
        <Calendario fuente={this.state.fuente} />
      </div>
    );
  }
}
