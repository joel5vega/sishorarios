import React, { Component, Contetxt } from "react";
import Lista from "../../components/Lista";
import ContextProvider from "../../containers/ContextProvider";

export default class HomeResponsables extends Component {
  componentDidMount() {}
  render() {
    // let data = this.context;
    let { datos } = this.props;

    console.log("----componente home responsables---");
    // console.log(data);
    console.log(datos);

    return (
      <div>
        <div className="container">
          <h3>Home</h3>
          {datos.map((item) => {
            return (
              <li key={item.id}>
                {item.titulo}. {item.ap_paterno}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

HomeResponsables.contextType = ContextProvider;
