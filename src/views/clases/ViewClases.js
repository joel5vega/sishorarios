import React, { Component } from "react";
import Calendario from "../../components/Calendario";
import { withRouter } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "../../fontawesome";
import Fab from "@material-ui/core/Fab";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { Typography } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";
import DetalleClase from "./DetalleClase";

class ViewClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      fuente: "http://localhost:8000/api/clases",
      externo: false,
      show: false,
      guardar: false,
      editar: false,
      clase: {},
    };
  }

  componentDidMount() {
    this.verificarEntrada();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
      this.verificarEntrada();
    }
  }
  // modal para mostrar clases
  modal = () => {
    this.setState({ show: true, guardar: true, editar: false });
  };
  getDateClick = (e) => {
    console.log(e);
  };
  eventClick = (e) => {
    var id = e.event;
    var clase = e.event.extendedProps;
    var startTime = e.event.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var endTime = e.event.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var daysOfWeek = e.event.start.getDay();
    clase = {
      ...clase,
      startTime: startTime,
      endTime: endTime,
      daysOfWeek: daysOfWeek,
      color: e.event.backgroundColor,
      title: e.event.title,
    };
    this.setState({
      show: true,
      guardar: true,
      editar: false,
      claseID: id,
      clase: clase,
      backgroundColor: e.event.backgroundColor,
    });

    console.log(clase);
  };
  onHide = () => {
    this.setState({ show: false });
  };
  ///////////////////////
  onRouteChanged() {
    console.log("ROUTE CHANGED");
  }
  verificarEntrada() {
    var estado = this.props.location.state;
    if (estado) {
      // console.log(estado);
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
        <div>
          <div>
            <Modal
              show={this.state.show}
              onHide={this.onHide}
              aria-labelledby="contained-modal-title-vcenter"
            >
              <form onSubmit={this.guardar}>
                <Modal.Header
                  closeButton
                  style={{ backgroundColor: this.state.backgroundColor }}
                >
                  <div style={{ alignContent: "center" }}></div>
                  <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ color: "white" }}
                  >
                    {this.state.clase.tipo}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <DetalleClase clase={this.state.clase} />
                </Modal.Body>
              </form>
            </Modal>
          </div>
        </div>
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
              <Typography variant="overline" gutterBottom>
                Exportar
              </Typography>
            </Fab>
          </div>
        </div>

        {this.state.externo && <h1>{this.state.titulo}</h1>}
        <Calendario
          fuente={this.state.fuente}
          getDateClick={this.getDateClick}
          eventClick={this.eventClick}
        />
      </div>
    );
  }
}

export default withRouter(ViewClases);
