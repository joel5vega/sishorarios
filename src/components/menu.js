import React, { Component, useEffect } from 'react'
//import FetchClases from '../containers/FetchClases'

export default class Menu extends Component {

    // state = {
    //     loading: true,
    //     clases: [],
    // };
    constructor(props){
        super(props);
        let eventos=this.props.eventos
    }
    //this.setState({ clases: lista, loading: false })
   
    render() {
        // var lista = this.props.eventos
        // console.log(lista)
        // Con este parametro mapearemos el array creado 
        /*
        {eventos.map(clase => {
                return (
                    // se debe poner una key q identifique cuando se mapea un array
                    <div key={clase.id}>
                        <div>{clase.dia}</div>
                        <div>{clase.horaini}</div>
                        <div>{clase.horafin}</div>
                    </div>
                );
            }
            )
        }
        */
       return (
           <div>
           {this.props.eventos}
       </div>
       )
       
       

    }
}