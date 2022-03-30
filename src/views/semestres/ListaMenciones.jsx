import React from "react";

import TarjetaSemestre from "../../components/tarjetas/TarjetaSemestre";
const color = { "general": "green", "control": "var(--color-second-1)", "telecom": "var(--color-second-2)", "sistemas": "var(--color-second-3)" }
const ListaMenciones = (props) => {
  return (
    <div className="lista-menciones">
        
      {/* {props.semestres.map((item) => {
        return (

          <div key={item.id}>
            <NavLink
              to={{
                pathname: "/clase/view",
                state: {
                  fuente:
                    this.state.url +
                    "clases/semestre/" +
                    item.semestre +
                    "?mencion=" +
                    item.mencion_id,
                  titulo:
                    item.mencion === "general"
                      ? item.semestre + " Semestre "
                      : item.semestre + " Semestre - Mencion:" + item.mencion
                }
              }}
            >
              <TarjetaSemestre
                semestre={item.semestre}
                mencion={item.mencion}
                color={color[item.mencion]}
              />
            </NavLink>
          </div>
        );
      })} */}o
    </div>
  );
};
// export default ListaMenciones;
