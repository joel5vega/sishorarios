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

  eventClick = (e) => {
    // console.log("estamos en el padre");

    // console.log(e.event);
    // this.modal();
    var id = e.event;
    var clase = e.event.extendedProps;
    // var startTime= e.event.
    
    this.setState({
      show: true,
      guardar: true,
      editar: false,
      claseID: id,
      clase: clase,
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
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.titulo}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                  <DetalleClase
                    id={this.state.claseID}
                    clase={this.state.clase}
                  />
                </Modal.Body>
                <Modal.Footer>
                  {this.state.guardar && (
                    <Button onClick={this.guardar}>Guardar</Button>
                  )}
                  {this.state.editar && (
                    <Button
                      // type="submit"
                      onClick={this.guardar}
                    >
                      Actualizar
                    </Button>
                  )}
                  <Button onClick={this.onHide}>Cancelar</Button>
                </Modal.Footer>
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
          getDateClick={console.log("click en hora")}
          eventClick={this.eventClick}
        />
      </div>
    );
  }
}

export default withRouter(ViewClases);
