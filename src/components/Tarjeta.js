import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 100,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const { titulo, subtitulo, detalle, } = props;
  // this.funcion = this.props.funcion;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="overline" component="p">
            {subtitulo}
          </Typography>
          <Typography variant="h4" color="textPrimary" component="p">
            {titulo}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {detalle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
