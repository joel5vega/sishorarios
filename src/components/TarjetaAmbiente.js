import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { sizing } from "@material-ui/system";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    backgroundColor: (props) => props.color,
    boxSizing: "5%",
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles(props);
  const { nombre, tipo, capacidad, color } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="body1" component="p">
            {nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tipo}
          </Typography>
          {capacidad}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
