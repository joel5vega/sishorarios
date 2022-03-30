import React from "react";
import { NavLink } from "react-router-dom";
import UrlService from "../../services/UrlService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBolt,faSatelliteDish,faServer,faRobot} from "@fortawesome/free-solid-svg-icons";

const TarjetaSemestre = (props) => {
  return (
    <div className="tarjeta-semestre" style={{ background: props.color }}>
      <div className="accion" key={props.id}>
        <NavLink
          to={{
            pathname: "/clase/view",
            state: {
              fuente:
                UrlService.apiUrl() +
                "clases/semestre/" +
                props.semestre +
                "?mencion=" +
                props.mencion_id,
              titulo:
                props.mencion === "general"
                  ? props.semestre + " Semestre "
                  : props.semestre + " Semestre - Mencion:" + props.mencion
            }
          }}
        >
          <div className="tarjeta-semestre-contenido">
            {props.semestre} <FontAwesomeIcon icon={props.mencion==="general"?faBolt:props.mencion==="control"?faRobot:props.mencion==="sistemas"?faServer:faSatelliteDish} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
export default TarjetaSemestre;
