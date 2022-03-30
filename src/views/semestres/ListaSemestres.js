import React, { Component } from "react";
import TarjetaSemestre from "../../components/tarjetas/TarjetaSemestre";
import UrlService from "../../services/UrlService";
export default class ListaSemestres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: this.props.semestres,

      url: UrlService.apiUrl()
    };
  }

  render() {
    const color = { "general": "green", "control": "var(--color-second-1)", "telecom": "var(--color-second-2)", "sistemas": "var(--color-second-3)" }
    return (
      <div className="home__semestres">
        {this.props.semestres.general.length > 0 &&
          <div className="home__menciones">
            <div className="mencion">
              <h5>General</h5>
              <div className="semestres">
                {this.props.semestres.general.map((item) => {
                  return (
                    <div key={item.id}>
                      <TarjetaSemestre
                        id={item.id}
                        semestre={item.semestre}
                        mencion={item.mencion}
                        color={color[item.mencion]}
                      />
                    </div>
                  );
                })
                }
              </div>
            </div>
            <div className="mencion">
              <h5>Control</h5>
              <div className="semestres">
                {this.props.semestres.control.map((item) => {
                  return (
                    <div key={item.id}>
                      <TarjetaSemestre
                        id={item.id}
                        semestre={item.semestre}
                        mencion={item.mencion}
                        color={color[item.mencion]}
                      />
                    </div>
                  );
                })
                }
              </div>
            </div>
            <div className="mencion">
              <h5 style={{ color: color["sistemas"], width: "100%" }}>Sistemas</h5>
              <div className="semestres">
                {this.props.semestres.sistemas.map((item) => {
                  return (
                    <div key={item.id}>
                      <TarjetaSemestre
                        mencion_id={item.mencion_id}
                        id={item.id}
                        semestre={item.semestre}
                        mencion={item.mencion}
                        color={color[item.mencion]}
                      />
                    </div>
                  );
                })
                }
              </div>
            </div>
            <div className="mencion">
              <h5>Telecom.</h5>
              <div className="semestres">
                {this.props.semestres.telecom.map((item) => {
                  return (
                    <div key={item.id}>
                      <TarjetaSemestre
                        mencion_id={item.mencion_id}
                        id={item.id}
                        semestre={item.semestre}
                        mencion={item.mencion}
                        color={color[item.mencion]}
                      />
                    </div>
                  );
                })
                }
              </div>
            </div>
          </div>
        }


      </div>
    );
  }
}
