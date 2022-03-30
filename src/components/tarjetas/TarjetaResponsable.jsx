import React from "react";
import "./tarjetas.css";
import { NavLink } from "react-router-dom";
import UrlService from "../../services/UrlService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFlask } from "@fortawesome/free-solid-svg-icons";
const color = {
  docente: "var(--color-second-1)",
  auxiliar: "var(--color-second-2)"
};
const TarjetaResponsable = (props) => {
  const { nombre, titulo, id, puesto } = props;
  return (
    <div className="tarjeta-responsable" key={id} >
      <NavLink
        to={{
          pathname: "/clase/view",
          state: {
            fuente: UrlService.apiUrl() + "clases/responsable/" + id,
            titulo: " " + titulo + nombre
          }
        }}
      >
        <div
          className="tarjeta-responsable-puesto"
          style={{ background: color[props.puesto] }}
        >
          {puesto}{" "}
          {puesto === "docente" ? (
            <FontAwesomeIcon icon={faBook} />
          ) : (
            <FontAwesomeIcon icon={faFlask} />
          )}
        </div>
        <div className="tarjeta-responsable-nombre">
          {titulo} {nombre}
        </div>
      </NavLink>
    </div>
  );
};
export default TarjetaResponsable;
