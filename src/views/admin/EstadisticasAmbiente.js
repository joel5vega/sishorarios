import axios from "axios";
import React, { Component } from "react";
import TarjetaMateria from "../../components/TarjetaMateria"
export default class EstadisticasAmbiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: 'http://127.0.0.1:8000/api/',
      ambiente: {
        total: {},
        diario: {}
      }
    };
  }
  componentDidMount() {
    this.getDatosAmbientes();
  }
  async getDatosAmbientes() {
    var url = this.state.url + 'datos?tipo=ambiente'
    try {
      axios.get(url).then((response) => {
        this.setState({ ambiente: response.data.ambiente })
        // console.log(response.data.ambiente)
      })
    }
    catch (e) { console.log(e) }
  }
  render() {
    var { diario, total } = this.state.ambiente;
    return (
      <div className="tarjeta-big">
        <div className="tarjeta-big">
          <div className="tarjetas-titulo">Uso Total de ambientes</div>
          {Object.keys(total).map((key) => (
            <div >
              {/* <div className="tarjetas-titulo">{key}</div> */}
              <TarjetaMateria
                avatar={total[key]}
                tipo={key}
                nombre="horas"
                color="green"
              />
              <div className="tarjeta-peque">
                {/* {total[key]} horas */}
              </div>

            </div>
          ))}
        </div>
        <div className="tarjeta-big">
          <div className="tarjetas-titulo">Uso de Ambientes por día</div>
          {Object.keys(diario).map((aula) => (
            <div className="tarjeta-big">
              <div className="tarjetas-titulo">{aula}</div>
              {Object.keys(diario[aula]).map((key) =>
                <div className="cuadro">
                  {key}
                  <br></br>
                  {diario[aula][key]} h
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    );
  }
}
