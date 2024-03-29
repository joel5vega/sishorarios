import React, { Component } from "react";
import "../css/Loader.css";
class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="loader-text">
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }
}
export default Loader;
