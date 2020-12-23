import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import NavigationIcon from "@material-ui/icons/Navigation";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import "../css/Flotante.css";

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
