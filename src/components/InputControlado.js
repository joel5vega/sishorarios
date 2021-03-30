import React, { Component } from "react";

export default class InputControlado extends Component {
  render() {
    const { tipo, label, valor, nombre, handleChange } = this.props;
    return (
      <div className="tarjeta-peque">
        <label>{label}</label>
        <br />
        <input
          type={tipo ? tipo : "text"}
          placeholder={label}
          
          name={nombre}
          value={valor}
          onChange={handleChange}
        />
      </div>
    );
  }
}
