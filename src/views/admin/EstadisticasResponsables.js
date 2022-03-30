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
        <div className="tarjetas-titulo">Horas Asignadas a Docentes</div>
        <div className="tarjetas">

          {Object.keys(responsables).map((key) => (
            <div key={key}>
              <TarjetaMateria
                avatar={responsables[key] + "h"}
                tipo={key}
                color="var(--color-second-3)"
              />
            </div>
          ))}
        </div>
        <hr />
        <div className="tarjetas-titulo">Docente equivalente: </div>
        <div>La carrera posee  {docente_equivalente}  docentes con carga horaria equivalente  40h.</div>
        <small>"Docente equivalente indica el número de docentes a tiempo completo que tendria
          una institución."</small>

      </div>
    );
  }
}
