import React, { Component } from "react";

export default class CheckControlado extends Component {
  render() {
    const {
      label,
      value,
      datos,
      handleChange,
    } = this.props;
    return (
      <div className="tarjeta-peque">
        <label >{label}</label>
        <div className="fila">
          {datos.map((item) => {
            return (
              <div key={item.id}>
                {item.nombre !== "General" && (
                  <div key={item.id} className="tarjeta-peque">
                    <input type="checkbox"
                      onChange={handleChange}
                      value={item.id}
                      name={item.id}
                      checked={value[item.id]}
                    />
                    <p key={item.id} value={item.id}>
                      {item.nombre}
                    </p>
                  </div>
                )
                }
              </div>
            )
          })
          }
        </div>


      </div>
    );
  }
}
