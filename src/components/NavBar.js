import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import '../css/estiloNavbar.css'
import mainlogo from '../images/logo.png';
import secondlogo from '../images/logo-canaan.png';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'transparent',
            imagen: mainlogo,
            colorbtn: 'btn btn-danger my-2 my-sm-0 '
        }
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        let scrollTop = window.scrollY;
        // itemTranslate = Math.min(0, scrollTop/3 - 60);
        if (scrollTop > 60) {
            this.setState({
                backgroundColor: 'white',
                imagen: secondlogo,
                colorbtn: 'btn btn-outline-danger my-2 my-sm-0 '

            });


        }
        else {
            this.setState({
                backgroundColor: 'transparent',
                imagen: mainlogo,
                colorbtn: 'btn btn-danger my-2 my-sm-0 '
            });

        }

    }

    render() {

        const styles = {
            containerStyle: {
                backgroundColor: this.state.backgroundColor,

            }
        };
        const { containerStyle } = styles;

        return (

            <div>
                <header className="header">
                    <nav className="navbar navbar-expand-lg navbar-light text-ligth fixed-top" style={containerStyle}>
                        <Link to="/">
                            <img src={this.state.imagen} id="logo_header" height='48px' width='111px' alt='commitSRL'></img>
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto">
                                <Link to="/" className="nav-link">
                                    <li className="nav-item active">
                                        Home
                                </li>
                                </Link>
                                <select id="select">Ambientes
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                                



                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
                                <button className={this.state.colorbtn} type="submit">Buscar</button>
                            </form>
                        </div>
                    </nav>
                </header></div>);
    }



}
export default NavBar;