import React from "react";
import { NavLink } from "react-router-dom";
import UrlService from "../../services/UrlService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faFlask } from "@fortawesome/free-solid-svg-icons";

const TarjetaAmbiente = (props) => {
  return (
    <div className="tarjeta-ambiente" style={{ background: props.color }}key={props.id}>
      <div className="accion" >
        <NavLink
          to={{
            pathname: "/clase/view",
            state: {
              fuente: UrlService.apiUrl() + "clases/ambiente/" + props.id,
              titulo: "" + props.nombre
            }
          }}
        >
          <div className="tarjeta-semestre-contenido">
            {props.nombre}
            <div>
              {props.capacidad}
              <FontAwesomeIcon
                icon={props.tipo === "laboratorio" ? faFlask : faHouseUser}
              />
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
export default TarjetaAmbiente;
