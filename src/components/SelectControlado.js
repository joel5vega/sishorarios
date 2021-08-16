import React, { Component } from "react";

export default class SelectControlado extends Component {
  render() {
    const {
      label,
      value,
      name,
      datos,
      handleChange,
      index,
      materia,
      disabled
    } = this.props;
    return (
      <div className="entrada">
        <label >{label}</label>
        <select value={value} name={name} onChange={handleChange} disabled={disabled} >
          <option value="default" disabled={true}>
            ...{" "}
          </option>
          {datos.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {index
                  ? item.titulo + "  " + item.ap_paterno + " " + item.nombre
                  : materia
                    ? item.sigla
                    : item.nombre}
              </option>
            );
          })
          }
        </select>
      </div>
    );
  }
}
