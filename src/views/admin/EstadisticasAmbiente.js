import axios from "axios";
import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import UrlService from "../../services/UrlService";
export default class EstadisticasAmbiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: UrlService.apiUrl(),
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
            stepSize: 8,
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
              // var id = values
              if (labels[value] === "length") {
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
        backgroundColor: '#40916C',
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(216,243,220,0.1)',
        hoverBorderColor: 'rgba(8, 28, 21)',
        data: total,
        skipNull: true
      }]
    }

    return (
      <div className="cuadro" >

        <div className="tarjeta-big">
          <div className="tarjetas-titulo">Uso de Ambientes por día</div>
          {Object.keys(diario).map((aula) => (
            <div className="tarjeta-big" key={aula}>
              <div className="tarjeta-peque">
                <Bar data={{
                  labels: Object.keys(diario[aula]),
                  // labels:["Lun","Ma","mi","J","V"],
                  datasets: [{
                    label: aula,
                    backgroundColor: "#40916C",
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
                          if (labels[value] === "length") {

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
        <div className="tarjetas-titulo">Uso semanal de ambientes</div>
        <div className="diagrama">
          <Bar data={data} options={opcionT} />
        </div>




      </div >
    );
  }
}
