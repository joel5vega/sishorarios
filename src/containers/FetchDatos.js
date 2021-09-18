import React, { Component } from 'react'

 class FetchDatos extends Component {
    //constructor
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            choqueSemestre: [],
            choqueAmbiente: [],
            materias: [],
            ambientes: [],
            response: []

        }
    }
    askMaterias(materias) {
        this.props.ask(materias)
    }


    //fetch data
    async componentDidMount() {
        const url = "http://127.0.0.1:8000";
        const urlMaterias = url + "/index/materias/" + this.props.semestre;
        if (!this.props.tipo) {
            var urlAmbientes = url + "/index/ambientes";
        }
        else (
            urlAmbientes = url + "/index/ambientes?tipo=" + this.props.tipo
        )

        const urlSemestre = url + "/semestres/" + this.props.semestre;
        const urlAmbiente = url + "/ambientes/" + this.props.ambiente;
        Promise.all([
            fetch(urlMaterias).then(value => value.json()),
            fetch(urlAmbientes).then(value => value.json()),
            fetch(urlSemestre).then(value => value.json()),
            fetch(urlAmbiente).then(value => value.json())
        ]).then(allResponses => {
            const materias = allResponses[0];
            const ambientes = allResponses[1];
            const choqueSemestre = allResponses[2];
            const choqueAmbiente = allResponses[3];
            this.setState({ materias: materias, ambientes: ambientes, choqueAmbiente: choqueAmbiente, choqueSemestre: choqueSemestre, loading: false })
            // console.log(this.state);

        }).catch((err) => {
            console.log(err);
        });
        this.askMaterias(this.state.materias.materias)

        this.setState({ response: this.state.materias.materias })
    }

    traduccion() {

    }
    mapeo() {
        var inSemestre = 2;
        var inMencion = 'telecomunicaciones';
        var inAmbiente = 'Aula-306';
        if (!inAmbiente) {
            if (inSemestre < 7) {
                const semestres = this.state.clases.filter(clase => clase.semestre === inSemestre);
                this.setState({ test: semestres })
            }
            else {
                switch (inMencion) {
                    case 'control':
                        const control = this.state.clases.filter(clase => clase.semestre === inSemestre && clase.control === "si");
                        this.setState({ test: control })
                        return "control";
                        break;
                    case 'sistemas':
                        const sistemas = this.state.clases.filter(clase => clase.semestre === inSemestre && clase.sistemas === "si");
                        this.setState({ test: sistemas })
                        break;
                    case 'telecomunicaciones':
                        const telecomunicaciones = this.state.clases.filter(clase => clase.semestre === inSemestre && clase.telecomunicaciones === "si");
                        this.setState({ test: telecomunicaciones })
                        break;
                    default:
                        return "opcion invalida";
                }

            }
        }
        else {
            const ambiente = this.state.clases.filter(clase => clase.ambiente === inAmbiente);
            this.setState({ test: ambiente });
        }

        //const ambientes = this.state.clases.filter(clase=>clase.ambiente == "Aula-306",clase.mencion);
        //this.setState({test:semestres})
        console.log(this.state.test);
        return "exito";

    }
    render() {
        const { ask } = this.props;

        if (this.state.loading) {
            return <div>cargando todavia</div>
        }

        if (this.state.materias.length)
            return <div>No se encontro datos</div>


        return (

            "HOla"


        );
    }
}