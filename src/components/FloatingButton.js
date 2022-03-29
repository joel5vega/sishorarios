import React from "react";
import Fab from "@material-ui/core/Fab";

export default function FloatingButton() {
  const props = [{ nombre: "Control" }, { nombre: "Sistemas" }];
  //   const { elementos } = this.props;
  const elementos = props;
  return (
    <div className="sticky">
      {elementos.map((item,id) => {
        return (
          <Fab key={id} color="primary" variant="extended" aria-label="option">
            {item.nombre}
          </Fab>
        );
      })}
    </div>
  );
}
