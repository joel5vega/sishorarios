import React, { Component } from "react";
import UrlService from "../services/UrlService";

export default class CrearMateria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materias: [],
    
      url: UrlService.apiUrl(),
      data: [],
      show: true,
      menciones: ["Control", "Sistemas"],
      selected: this.props.selected,
      pensum: "",
      semestre: "",
      sigla: "",
      nombre: "",
      mencion: "",
      tipo: "",
      paralelo: "",
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // this.fetchData();
  }
  // async fetchData = ()
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    // Propagar datos al padre
    this.props.onChange(evento);
  };

  render() {
    const styles = {
      //   border: "1px solid blue",
    };
    // const {
    //   pensums,
    //   pensum,
    //   semestre,
    //   sigla,
    //   nombre,
    //   menciones,
    //   tipo,
    //   paralelo,
    // } = this.state;
    return (
      <div style={styles}>
        <div className="form-row">
          <div className="form group col-auto">
            {/* <SelectControlado
              label="Pensum"
              value={pensum}
              name="puesto"
              handleChange={this.handleChange}
              datos={pensums}
            /> */}

            <label>Pensum</label>
            <select
              className="form-control"
              name="pensum"
              onChange={this.handleChange}
              required
            >
              <option value="" disabled={true}></option>
              <option value="2000">Pensum 2000</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-auto">
            <label htmlFor="semestre">Semestre</label>
            <select
              className="form-control"
              name="semestre"
              value={this.props.semestre}
              onChange={this.handleChange}
            >
              <option>1</option>
            </select>
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="form-group col-auto">
            <label>Sigla</label>
            <input
              className="form-control"
              type="text"
              name="sigla"
              placeholder="Sigla"
              value={this.props.sigla}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group col-auto">
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={this.props.nombre}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="form-group col-auto">
            <label>Mencion</label>
            {this.state.menciones.map((item) => {
              const ho = "this.props." + item;
              const value = toString(ho);
              console.log(value);
              return (
                <div className="col-auto" key={item}>
                  <div className="control checkbox">
                    <input
                      value={value}
                      type="checkbox"
                      name={item}
                      onChange={this.handleCheckChange}
                    />
                    <label className="checkbox">{item}</label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-row align-items-center">
          <div className="form-group col-auto">
            <label>Tipo</label>
            <select
              className="form-control"
              value={this.props.tipo}
              name="tipo"
              onChange={this.handleChange}
            >
              <option value="">...</option>
              <option value="laboratorio">Laboratorio</option>
              <option value="teoria">Teoría</option>
            </select>
          </div>

          <div className="form-group col-auto">
            <label htmlFor="paralelo">Paralelo</label>
            <select
              className="form-control"
              name="paralelo"
              value={this.props.paralelo}
              onChange={this.handleChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
