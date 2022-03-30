import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Item } from "@mui-treasury/components/flex";
import Typography from "@material-ui/core/Typography";

const useBasicProfileStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection:"column",
    flexShrink: 3,
    flexGrow:2,
    // flexBasis: "100rem",
    // minWidth: "4rem"
    //  maxWidth: (props) => props.ancho,
    // maxHeight: (props) => props.alto,
  },
  info: {
    marginRight: 2,
  },
  avatar: {
     fontSize: (props) => props.size,
    borderRadius: 8,
    alignContent: "center",
    justifyContent:"align-center",
    verticalAlign:"center",
    backgroundColor: (props) => props.color,
  },
  overline: {
    fontSize: (props) => props.size,
    // textTransform: "uppercase",
    // display:"flex",
    // letterSpacing: "0.01em",
    // overflowWrap:'break-word',
    justifyContent:"center",
    minWidth:"110px"
    // backgroundColor:"red",
    // color: "#8D9CAD",
  },
  name: {
    fontSize: (props) => props.size,
    // display:"flex",
    // flex: "wrap",
    fontWeight: 500,
    justifyContent:"center",
    // color: "#495869",
    // justifyContent:"center",
    // maxWidth: (props) => props.ancho,
  },
});

export default function BasicProfile(props) {
  // same styles
  const { avatar, nombre, tipo } = props;
  const styles = useBasicProfileStyles(props);
  return (
    <div className="tarjeta" >
      <Row gap={1} {...props}>
        <Avatar className={styles.avatar}>{avatar}</Avatar>
        <Item position={"left"}>
          <Typography className={styles.overline}>{tipo}</Typography>
          <Typography className={styles.name}>{nombre}</Typography>
        </Item>
      </Row>
    </div>
  );
}
