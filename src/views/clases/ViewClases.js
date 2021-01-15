import React, { Component } from "react";
import Calendario from "../../components/Calendario";

import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Fab from "@material-ui/core/Fab";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { Typography } from "@material-ui/core";

export default class ViewClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      fuente: "http://127.0.0.1:8000/api/clases",
      externo: false,
    };
  }

  componentDidMount() {
    this.verificarEntrada();
  }
  verificarEntrada() {
    var estado = this.props.location.state;
    if (estado) {
      console.log(estado);
      this.setState({
        fuente: estado.fuente,
        titulo: estado.titulo,
        externo: true,
      });
    } else {
      console.log("no llego");
    }
  }

  //Exportar PDF
  printPDF = () => {
    const domElement = document.getElementById("root");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf({
        orientation: "landscape",
      });
      // 180,160
      pdf.addImage(imgData, "PNG", 5, 5, 270, 140);
      // pdf.addImage(imgData, "JPEG", 5, 5, 265, 200);
      pdf.save(`${new Date().toISOString()} Horario.pdf`);
    });
    alert("Se empezo la descarga de su documento PDF");
  };
  ///////////////////
  render() {
    return (
      <div>
        <div className="flotante">
          <div id="print" className="sticky">
            <Fab
              onClick={this.printPDF}
              key="pdf"
              // color="primary"
              variant="extended"
              aria-label="option"
            >
              <PictureAsPdfIcon />
              <Typography variant="overline" gutterBottom >Exportar</Typography>
            </Fab>
          </div>
        </div>

        {this.state.externo && <h1>{this.state.titulo}</h1>}
        <Calendario fuente={this.state.fuente} />
      </div>
    );
  }
}
