import React, { Component } from "react";

export default class InputControlado extends Component {
  render() {
    var { tipo, label, valor, nombre, handleChange } = this.props;
    return (
      <div className="form__text">
        <label>{label}</label>
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
