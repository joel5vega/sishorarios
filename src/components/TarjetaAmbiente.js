import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import { sizing } from "@material-ui/system";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "react-bootstrap";
// let theme = createMuiTheme();
// theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: "2",
    flexBasis: "6rem",
    maxWidth: (props) => props.ancho,
    margin:"0.02rem",
    // height:"0.2rem",
    // maxHeight: "fit-content",
    // maxHeight: (props) => props.alto,
    backgroundColor: (props) => props.color,
  },
  informacion: {
    margin:0,
    fontWeight: "bold",
    fontSize: (props) => props.capacidad / 20 + "rem",
  },
});

export default function ImgMediaCard(props) {
  const { nombre, capacidad } = props;
  const size = parseInt(capacidad) / 10 / 4;
  const classes = useStyles(props, size);
  return (
    <div className="tarjeta">
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <ThemeProvider>
              <Typography variant="caption" component="p">
                {nombre}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                Capacidad:
              </Typography>
              <Typography className={classes.informacion}>
                {capacidad}
              </Typography>
            </ThemeProvider>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
