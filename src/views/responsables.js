import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import '../fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class responsables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materias: [],
            url: "http://127.0.0.1:8000",
            data: [],
            show: false,
            menciones: ['control', 'sistemas'],
            pensum: "", semestre: "", sigla: "", nombre: "", mencion: "", tipo: "", paralelo: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        this.fetchData();
    }
    async fetchData() {
        let urlMaterias = "http://127.0.0.1:8000/index/materias"
        const data = await fetch(urlMaterias)
        this.setState({ data: data })
    }
    editar(e) {
        // console.log("editar: " + e)
        this.setState({ show: true, guardar: false, editar: true, id: e })
    }
    eliminar(e) {
        console.log("eliminar: " + e)
    }
    onHide = () => {
        this.setState({ show: false })
    }
    nuevo = () => {
        this.setState({ show: true, guardar: true, editar: false, id: "" })
    }
    guardar = (e) => {
        e.preventDefault()
        if (this.state.id) {
            var evento = {
                nombre: this.state.nombre, tipo: this.state.tipo, capacidad: this.state.capacidad,
                edificio: this.state.edificio, piso: this.state.piso, id: this.state.id
            };
        }
        else {
            var evento = {
                nombre: this.state.nombre, tipo: this.state.tipo, capacidad: this.state.capacidad,
                edificio: this.state.edificio, piso: this.state.piso
            };
        }
        console.log("guardar: ")
        console.log(evento)
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value

        //=== 'nombre' ? target.value:target.value;
        const name = target.name;
        this.setState({ [name]: value });
        console.log(name);
        console.log(value);

    }
    handleCheckChange(event) {
        const target = event.target;
        const value = target.checked

        //=== 'nombre' ? target.value:target.value;
        const name = target.name;
        this.setState({ [name]: value });
        console.log(name);
        console.log(value);

    }
    render() {
        return (
            <div>
                responsables
                <div>
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-8"><h2>Lista de  <b>Responsables</b></h2></div>
                                    <div className="col-sm-4">
                                        <button onClick={this.nuevo} type="button" className="btn btn-info add-new">
                                            <FontAwesomeIcon icon={'plus'} size="1x" /> <small>Nuevo</small>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th className="src-only">Puesto</th>
                                        <th className="fit">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.materias.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.sigla}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.semestre}</td>
                                            <td>{item.tipo}</td>
                                            <td>
                                                <a type="button" href="#"
                                                    className='btn ml-4'
                                                    onClick={() => this.editar(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={'edit'} />
                                                </a>
                                                <a type="button" href="#"
                                                    className='btn ml-4'
                                                    onClick={() => this.eliminar(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={'trash'} />
                                                </a>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        show={this.state.show}
                        onHide={this.onHide}
                        aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Responsable
                    </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <div className="form-group">
                                <div className="form-row align-items-center">
                                    <div className="col-auto col-3">
                                        <label>Pensum</label>
                                        <select name="pensum" onChange={this.handleChange} required>
                                            <option value="" disabled={true}></option>
                                            <option>...</option>
                                        </select>
                                    </div>
                                    <div className="col-auto col-3">
                                        <label htmlFor="semestre">Semestre</label>
                                        <select name="semestre" value={this.state.semestre} onChange={this.handleChange}>
                                            <option>1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">

                                <div className="col-auto col-3">
                                    <label>Sigla</label>
                                    <input type="text" className="col-3" name="sigla"
                                        value={this.state.sigla} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-auto col-7">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className="col-6"
                                        name="nombre"
                                        value={this.state.nombre}
                                        onChange={this.handleChange} />
                                </div>

                            </div>
                            <div className="form-group">
                                <div className="form-row align-items-center">
                                    <div className="col-auto">
                                        <label>Mencion</label>
                                    </div>
                                    {this.state.menciones.map(item =>
                                        <div className="col-auto" key={item} >
                                            <div className="control checkbox">
                                                <input type="checkbox" name={item} onChange={this.handleCheckChange} />
                                                <label className="checkbox">{item}</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row align-items-center">
                                    <div className="col-auto">
                                        <label>Tipo</label>
                                        <select value={this.state.tipo}
                                            name="tipo" onChange={this.handleChange}>
                                            <option>Labo/TEo</option>
                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        <label htmlFor="paralelo">Paralelo</label>
                                        <select
                                            name="paralelo" value={this.state.paralelo}
                                            onChange={this.handleChange}>
                                            <option>
                                                A/B
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {this.state.guardar &&
                                <Button type="submit" onClick={this.guardar}>Guardar</Button>
                            }
                            {this.state.editar &&
                                <Button type="submit" onClick={this.guardar}>Actualizar</Button>
                            }
                            <Button onClick={this.onHide}>Close</Button>
                        </Modal.Footer>
                    </Modal >
                </div >

            </div >
        )
    }
}