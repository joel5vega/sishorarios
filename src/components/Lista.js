import React, { Component } from "react";
import '../css/materias.css'
import '../fontawesome';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "titulo"
        }
    }
    render() {
        return (
            <div>
                <h2>{this.props.titulo}</h2>
                <div className="container-lg">
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-8"><h2>Lista de  <b>{this.props.titulo}</b></h2></div>
                                    <div className="col-sm-4">
                                        <Link to={'/crear/clase'} >
                                            <button type="button" className="btn btn-info add-new">
                                                <FontAwesomeIcon icon={'plus'} size="1x" /> <small>Nuevo</small>
                                            </button>


                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {this.props.columnas.map(item =>
                                            <th key={item}>{item}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {this.props.datos.map(item =>
                                            <div>
                                                <td>{item.nombre}</td>
                                                <td>{item.sigla}</td>
                                            </div>



                                        )}




                                        <td>
                                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Peter Parker</td>
                                        <td>Customer Service</td>
                                        <td>(313) 555-5735</td>
                                        <td>
                                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fran Wilson</td>
                                        <td>Human Resources</td>
                                        <td>(503) 555-9931</td>
                                        <td>
                                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }
}