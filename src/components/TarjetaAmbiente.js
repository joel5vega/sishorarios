import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { sizing } from "@material-ui/system";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "react-bootstrap";
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    flex: "1 2 5rem",
    maxWidth: (props) => props.ancho,
    maxHeight: (props) => props.alto,
    backgroundColor: (props) => props.color,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles(props);
  const { nombre, tipo, detalle } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <ThemeProvider>
            <Typography gutterBottom variant="body2" component="p">
              {nombre}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {tipo}
            </Typography>
            <Typography variant="overline">{detalle}</Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
