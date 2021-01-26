import React from "react";
import { NavLink, RouterComponentProps, withRouter } from "react-router-dom";
import { Component } from "react";
// import './_style.scss';

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
    var tipo= response.tipo;
    var usuario = response.user;
    console.log("response", response.tipo);
    if (response) {
      AuthService.handleLoginSucess(response, this.state.isChecked);

      auth.update();
      var autenticado = auth.isAuthenticated();

      this.props.handleAuth(tipo,usuario);
      this.props.history.push("/clase");
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
                <p>Ingrese sus credenciales</p>
              </a>
            </div>

            <div className="card">
              <div className="card-body login-card-body">
                <h1 className="login-box-msg">Login</h1>

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
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input
                          type="checkbox"
                          id="remember"
                          onChange={() => this.handleChecked()}
                          checked={isChecked}
                        />
                        <label
                          onClick={() => this.handleChecked()}
                          id="remember-label"
                        >
                          Recordarme
                        </label>
                      </div>
                    </div>
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Login
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
