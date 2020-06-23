import React, { Component } from "react";
import Calendario from "../components/Calendario";
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

// import "./styles.css";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "http://127.0.0.1:8000",
      fuente: "http://127.0.0.1:8000/index?periodo=1",
      selectedPeriodo: "",
    }
  }

  printPDF = () => {
    const domElement = document.getElementById("root");
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden";
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf({
        orientation: 'landscape'
        
      });
      // 180,160
      pdf.addImage(imgData, "JPEG", 5, 5,265,200);
      pdf.save(`${new Date().toISOString()} Horario.pdf`);
    });
    alert("home sweet home")
  };


  render() {


    return (

      <div className='container'>

        <h2>HOME</h2>
        <div>
          <button id="print" onClick={this.printPDF}>
            PRINT
          </button>
        </div>

        <div className='container' >
          <Calendario fuente={this.props.fuente} />
        </div>



      </div>

    );

  }

}

export default Home;