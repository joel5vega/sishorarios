import axios from "axios";
import React, { Component } from "react";
import TarjetaMateria from "../../components/TarjetaMateria"
import { Bar } from "react-chartjs-2";

export default class EstadisticasAmbiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: "https://sishorarios.azurewebsites.net/public/api/",
      // url: 'http://127.0.0.1:8000/api/',
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
    var labels = Object.keys(total)
    const opcionT = {
      mantainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          ticks: {
            stepSize: 6,
            callback: function (value, index, values) {
              return value + ' hrs.';
            }
          }
        },
        x: {
          ticks: {
            padding: 1,
            display: "auto", autoSkip: true,
            callback: function (value, index, values) {
              var id = values
              if (labels[value] == "length") {
                // this.display = true
                return "";
              }
              else {
                return labels[value];
              }
            }

          }
        }
      }
    }


    const data = {
      labels: labels,
      datasets: [{
        type: 'bar',
        label: "Uso total",
        backgroundColor: '#40826d',
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,255,0,0.2)',
        hoverBorderColor: 'white',
        data: total,
        skipNull: true
      }]
    }

    return (
      <div className="cuadro" >
        <div className="tarjetas-titulo">Uso de ambientes</div>
        <div className="diagrama">
          <Bar data={data} options={opcionT} />
        </div>

        <div className="tarjeta-big">
          <div className="tarjetas-titulo">Uso de Ambientes por día</div>
          {Object.keys(diario).map((aula) => (
            <div className="tarjeta-big">
              {/* <div className="tarjetas-titulo">{aula}</div> */}
              <div className="tarjeta-peque">
                <Bar data={{
                  labels: Object.keys(diario[aula]),
                  // labels:["Lun","Ma","mi","J","V"],
                  datasets: [{
                    label: aula,
                    backgroundColor: "#add8e6",
                    borderColor: 'black',
                    data: diario[aula]
                  }]
                }} options={{
                  mantainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      ticks: {
                        callback: function (value, index, values) {
                          return value + ' h.';
                        }
                      }
                    },
                    x: {
                      ticks: {
                        display: "auto", autoSkip: true,
                        callback: function (value, index, values) {
                          var dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab."]
                          if (labels[value] == "length") {
                            
                          }
                          else {
                            return dias[index];
                          }
                        }
                      }
                    }
                  }
                }} />
              </div>

            </div>
          ))}
        </div>

      </div >
    );
  }
}
