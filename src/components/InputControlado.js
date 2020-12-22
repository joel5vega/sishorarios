import React, { Component } from "react";

export default class InputControlado extends Component {
  render() {
    const { tipo, label, valor, nombre, handleChange } = this.props;
    return (
      <div>
        <div className="form-group col-auto">
          <label className="col-6">{label}</label>
          <input
            type={tipo ? tipo : "text"}
            className="col-auto"
            placeholder={label}
            name={nombre}
            value={valor}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}
