import axios from "axios";
import React, { Component } from "react";
import TarjetaMateria from "../../components/TarjetaMateria"
import UrlService from "../../services/UrlService";

export default class EstadisticasResponsable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: UrlService.apiUrl(),
      responsable: {
        responsables: {},
        diario: {}
      }
    };
  }
  componentDidMount() {
    this.getDatosDocentes();
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
            <div key={key}>
              <TarjetaMateria
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
