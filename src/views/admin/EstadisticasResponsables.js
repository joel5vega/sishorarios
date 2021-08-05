import axios from "axios";
import React, { Component } from "react";
import TarjetaMateria from "../../components/TarjetaMateria"
import { Bar } from "react-chartjs-2";

export default class EstadisticasResponsable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: 'http://127.0.0.1:8000/api/',
      responsable: {
        responsables: {},
        diario: {}
      }
    };
  }
  componentDidMount() {
    this.getDatosDocentes();
    this.prueba();
  }
  async prueba() {
    var url = "http://localhost:8000/oauth/scopes";
    axios.get(url).then(response => { console.log(response.data) })
  }
  async getDatosDocentes() {
    var url = this.state.url + 'datos?tipo=responsable'
    try {
      axios.get(url).then((response) => {
        this.setState({ responsable: response.data.responsable })
        // console.log(response.data.responsable)
      })
    }
    catch (e) { console.log(e) }
  }
  render() {
    var { responsables, docente_equivalente } = this.state.responsable;
    return (
      <div>
        <div className="tarjetas-titulo">Docente equivalente: </div>{docente_equivalente}
        <div className="tarjetas-titulo">Horas Asignadas a Docentes</div>
        <div className="tarjetas">

          {Object.keys(responsables).map((key) => (
            <div>
              <TarjetaMateria
                // nombre="horas"
                avatar={responsables[key]+"h"}
                tipo={key}
                color="#0007CC"
              />
            </div>
          ))}
        </div>


      </div>
    );
  }
}
