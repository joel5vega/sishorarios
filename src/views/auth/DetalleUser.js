import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../fontawesome";
import axios from "axios";
import UrlService from "../../services/UrlService";

class DetalleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: UrlService.apiUrl(),
      externo: false,
      clase: this.props.id,
      clases: {},
    };
  }

  componentDidMount() {
    // this.verificarEntrada();
    // this.getDatos(this.state.clase);
  }
  getDatos(id) {
    var url = this.state.url + "clases/"+ id;
    axios.get(url).then((response) => {
      this.setState({
        clases: response.data,
        loading: false,
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
      // this.verificarEntrada();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
  }

  ///////////////////
  render() {
    var { email, name, responsable, tipo } = this.props.clase;
    return (
      <div>
        <div>
          <div className="tarjetas" style={{ borderColor: "green" }}>
            <div className="tarjeta-big">
              <div className="form-group">
                <div className="tarjetas-titulo-col">{tipo}</div>
                <div className="tarjeta-peque">Usuario: {name}</div>
                <div className="tarjeta-peque"> Correo: {email}</div>
                <div className="tarjetas">
                  <div className="tarjeta-peque">{responsable.titulo}</div>
                  <div className="tarjeta-peque">{responsable.ap_paterno}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DetalleUser);
