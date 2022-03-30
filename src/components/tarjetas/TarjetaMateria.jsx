import React from "react";
import "./tarjetas.css";
import { NavLink } from "react-router-dom";
import UrlService from "../../services/UrlService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook,faFlask } from "@fortawesome/free-solid-svg-icons";
const color = { "teoria": "var(--color-second-1)", "laboratorio": "var(--color-second-2)",  }
const TarjetaMateria = (props) => {
  const { nombre, sigla, tipo } = props;
  return (
    <div className="tarjeta-materia">
      <div className="tarjeta-materia-sigla" style={{ background: color[props.tipo] }}>{sigla} {tipo=="teoria"?<FontAwesomeIcon icon={faBook}/>:<FontAwesomeIcon icon={faFlask}/>}</div>
      <div className="tarjeta-materia-nombre">{nombre}</div>
    </div>
  );
};
export default TarjetaMateria;
