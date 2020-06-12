import React, { Component } from "react";
import NavItem from "../components/NavItem";
import Calendario from "../components/Calendario";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "http://127.0.0.1:8000",
      fuente:"http://127.0.0.1:8000/index?periodo=1",
      selectedPeriodo: "",
    }
  }

  /*
  componentDidMount() {
   this.getPeriodo()
  }
  async getPeriodo() {
    const urlPeriodo = this.state.url + "/index?index=periodos"
    const data = await fetch(urlPeriodo).then(value => value.json())
    this.setState({selectedPeriodo: data.periodo[0].id })
  }
  handlePeriodoSelect = (evento) => {
    console.log(evento)
    this.setState({ selectedPeriodo: evento })
  }
  handleAmbienteSelect = (evento) => {
    console.log(evento)
    var nuevaFuente = "http://127.0.0.1:8000/ambientes/" + evento;
    this.setState({ fuente: nuevaFuente })
  }
  handleSemestreSelect = (evento) => {
    console.log(evento)
    if (evento != 'undefined') {
      if (evento.value < 7) {
        var nuevaFuente = "http://127.0.0.1:8000/semestres/" + evento.value;
        this.setState({ fuente: nuevaFuente })
      }
      else
        //this.changeEvents(evento);
        var fuenteDatos = "http://127.0.0.1:8000/semestres/" + evento.value + "?mencion=" + evento.mencion;
      this.setState({ fuente: fuenteDatos })
    }

  }
  */
  render() {

    return (

      <div className='container'>

        <h2>HOME</h2>

        <div className='container' >
          <Calendario fuente={this.props.fuente} />
        </div>



      </div>

    );

  }

}

export default Home;