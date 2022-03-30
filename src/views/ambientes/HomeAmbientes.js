import React, { Component } from "react";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";
import TabPanel from "../../components/Tabs";
import AmbientesLibres from "./AmbientesLibres";
import ListaAmbientes from "./ListaAmbientes";
import axios from "axios";
import UrlService from "../../services/UrlService";

export default class HomeAmbientes extends Component {
  constructor(args) {
    super(args);
    this.state = {
      loading: true,
      url: UrlService.apiUrl(),
      libres: [],
      ocupados: [],
      showLib: true,
      showOcu: true,
      show: true,
    };
  }
  componentDidMount() {
    this.getAmbientes();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () => {
    this.setState({ width: window.innerWidth });

    if (window.innerWidth > 361) {
      this.setState({ show: false, showLib: true, showOcu: true });
      console.log(this.state.width);
    }
  };

  showHandler = () => {
    this.setState((prevState) => ({
      showOcu: !prevState.showOcu,
      showLib: !prevState.showLib,
    }));
  };
  async getAmbientes() {
    axios.get(this.state.url + "now?index=ambientes").then((response) => {
      this.setState({
        ocupados: response.data.ocupados,
        libres: response.data.libres,
        loading: false,
        width: window.innerWidth,
      });
    });
  }

  render() {
    var { libres, ocupados, } = this.state;
    // const label = ["Ambientes Ocupados", "Ambientes disponibles"];
    return (
      <div>
        <TabPanel
          label03="Lista de Ambientes"
          label02="Ambientes Ocupados"
          label01="Ambientes Libres"
          item02={
            <div className="tarjetas">
              {ocupados.length > 0
                ? ocupados.map((item) => {
                  return (
                    <div key={item.id}>
                      <TarjetaAmbiente
                        nombre={item.nombre}
                        tipo={item.tipo}
                        capacidad={item.capacidad}
                        color={
                          item.tipo === "laboratorio"
                            ? "var(--color-second-1)"
                            : "var(--color-second-2)"
                        }
                      />
                    </div>
                  );
                })
                : "No existen registros de ambientes ocupados en este momento"}
            </div>
          }
          item01={<AmbientesLibres datos={libres} />}
          item03={<ListaAmbientes datos={this.props.datos} />}

        />
      </div>
    );
  }
}
