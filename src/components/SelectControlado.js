import React, { Component } from "react";

export default class SelectControlado extends Component {
  render() {
    const { label, value, name, datos, handleChange, index } = this.props;
    const valor = "item.valor";
    return (
      <div>
        <div className="form-group col-auto">
          <label className="col-5">{label}</label>
          <select
            value={value}
            className="col-auto"
            name={name}
            onChange={handleChange}
            // defaultValue="default"
          >
            <option value="default" disabled={true}>
              Seleccione...            </option>
            {datos.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {index
                    ? item.titulo +
                      " " +
                      item.ap_paterno +
                      " " +
                      item.ap_materno
                    : item.nombre}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
