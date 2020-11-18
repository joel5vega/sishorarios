import React, { Component } from "react";
import Lista from "../../components/Lista";

export default class HomeAmbientes extends Component {
  render() {
    var { datos } = this.props;
    // console.log(this.props);
    return (
      <div>
        <div className="container">
          {datos.map((item) => {
            return <li key={item.id}>{item.nombre}</li>;
          })}
        </div>
      </div>
    );
  }
}
