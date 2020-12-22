import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Item } from "@mui-treasury/components/flex";
import Typography from "@material-ui/core/Typography";

const useBasicProfileStyles = makeStyles({
  root: {
    display: "flex",
    flexShrink: "200",
    flexBasis: "3rem",
    minWidth: (props) => props.ancho,
    // maxWidth: (props) => props.ancho,
    maxHeight: (props) => props.alto,
  },
  info: {
    marginRight: 5,
  },
  avatar: {
    fontSize: "0.8em",
    borderRadius: 8,
    alignContent: "center",
    backgroundColor: (props) => props.color,
  },
  overline: {
    fontSize: "0.6em",
    textTransform: "uppercase",
    letterSpacing: "0.01em",
    color: "#8D9CAD",
  },
  name: {
    fontSize: "0.5em",
    flex: "wrap",
    fontWeight: 500,
    color: "#495869",
    maxWidth: (props) => props.ancho,
  },
});

export default function BasicProfile(props) {
  // same styles
  const { sigla, nombre, tipo } = props;
  const styles = useBasicProfileStyles(props);
  return (
    <div className="tarjeta">
      <Row gap={1} {...props}>
        <Avatar className={styles.avatar}>{sigla}</Avatar>
        <Item position={"middle"}>
          <Typography className={styles.overline}>{tipo}</Typography>
          <Typography className={styles.name}>{nombre}</Typography>
        </Item>
      </Row>
    </div>
  );
}
