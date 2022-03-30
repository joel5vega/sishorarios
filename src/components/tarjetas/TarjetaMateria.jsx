import React from "react";
import { NavLink } from "react-router-dom";
import UrlService from "../../services/UrlService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TarjetaMateria = (props) => {
    const { nombre,sigla,tipo} = props;
  return (
    <div
      className="tarjeta-materia"
    //   style={{ background: props.color }}
    //   key={props.id}
    >
      {sigla} {nombre} {tipo}
    </div>
  );
};
export default TarjetaMateria;
