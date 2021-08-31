import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Component } from "react";
// import './_style.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import AuthService from "../../services/AuthService";
import auth from "../../components/common/router/protected/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleAuth = this.props.handleAuth;
  }

  state = {
    username: "",
    password: "",
    isChecked: false,
  };

  async handleFormSubmit(event) {
    event.preventDefault();
    const postData = {
      username: this.state.username,
      password: this.state.password,
    };
    const response = await AuthService.doUserLogin(postData);
    var tipo = response.tipo;
    var usuario = response.user;
    console.log("response", response.tipo);
    if (response) {
      AuthService.handleLoginSucess(response, this.state.isChecked);

      auth.update();
      var autenticado = auth.isAuthenticated();

      this.props.handleAuth(tipo, usuario);
      this.props.history.push("/");
      console.log(autenticado + "ir a home");
    } else {
      this.props.history.push("/login");
      alert("revise sus credenciales");
    }
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const { username, password, isChecked } = this.state;

    return (
      <React.Fragment>
        <div className="login-page">
          <div className="login-box">
            <div className="login-logo">
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
              </a>
            </div>

            <div className="card">
              <div className="card-body login-card-body">
                <h1 className="login-box-msg">Ingresar</h1>

                <form onSubmit={(event) => this.handleFormSubmit(event)}>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      name="name"
                      className="form-control"
                      placeholder="Email"
                      value={username}
                      onChange={(event) =>
                        this.setState({ username: event.target.value })
                      }
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(event) =>
                        this.setState({ password: event.target.value })
                      }
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                     <div className="tarjetas-titulo">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Ingresar
                      </button>
                    </div>
                  </div>
                </form>

                <p className="mb-0">
                  <NavLink to="/register">Registrar Nuevo usuario</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
