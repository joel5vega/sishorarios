import axios from "axios";
import React, { Component } from "react";
import TarjetaMateria from "../../components/TarjetaMateria"
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
        <div className="tarjetas-titulo">Docente equivalente: {docente_equivalente}</div>
        <div className="tarjetas-titulo">Horas Asignadas a Docentes</div>
        <div className="tarjetas">

          {Object.keys(responsables).map((key) => (
            <div>
              {/* <div className="tarjetas-titulo">Ing. {key}</div> */}
              <TarjetaMateria
                nombre="horas"
                avatar={responsables[key]}
                tipo={key}
                color="#0007CC"
              />

              <div className="tarjeta-peque">
                {/* {responsables[key]} horas */}
              </div>

            </div>
          ))}
        </div>
        {/* <div className="tarjeta-big">
        <div className="tarjetas-titulo">Uso de Ambientes por día</div>
          {Object.keys(diario).map((aula) => (
            <div className="tarjeta-big">
              <div className="tarjetas-titulo">{aula}</div>
              {Object.keys(diario[aula]).map((key) =>
                <div className="tarjeta-peque">
                  {key}
                  <br></br>
                  {diario[aula][key]} h
                </div>
              )}
            </div>
          ))}
        </div> */}

      </div>
    );
  }
}
