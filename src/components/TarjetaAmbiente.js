import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.2rem",
    minWidth: "135px",
    maxWidth: "85%",
    maxHeight: "",
    color: "var(--color-light)",
    fontSize: "1rem",
    backgroundColor: (props) => props.color,
    border: "1px solid var(--color-primary)",
    borderRadius: "0.5rem",
    margin: "0.1rem",
  },
  nombre: {
    fontSize: "1rem",
    color: "var(--color-primary)",
  },
  comentario: {
    color: "var(--color-bg)",
    fontSize: "0.8rem",
  }
});

export default function ImgMediaCard(props) {
  const { nombre, capacidad } = props;
  const size = parseInt(capacidad) / 10 / 4;
  const classes = useStyles(props, size);
  return (
    <div className={classes.root} >
      <div className={nombre}>{nombre}</div>
      <div className={capacidad}>{capacidad}  <FontAwesomeIcon icon={faHouseUser} /></div>
    </div>
  );
}
