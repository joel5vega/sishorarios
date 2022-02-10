// import AuthService from "./../../../../services/AuthService";
import CookieService from "../../../../services/CookieService";
import { withRouter } from "react-router-dom";
class Auth {
  constructor() {
    console.group("Servicio Auth");
    this.authenticated = false;
    this.tipo = "Estudiante";
    // this.user = {
    //   email: "estudiante@gmail.com",
    //   estado: "false",
    //   id: 5,
    //   name: "Joel",
    //   // tipo: "estudiante",
    // };
    const token = CookieService.get("access_token");
    const respuesta = CookieService.get("tipo");
    const usuario = CookieService.get("user");
    token ? (this.authenticated = true) : (this.authenticated = false);
    this.tipo = respuesta;
    
    // respuesta ? (this.tipo = respuesta) : (this.tipo = "estudiante");
    usuario
      ? (this.user = usuario)
      : (this.user = {
          email: "estudiante@mail.com",
          estado: "false",
          id: 1,
          name: "Cookie Joel",
          // tipo: "estudiante",
        });

        console.log("cookie returns:",this.user)
        console.groupEnd()

        
  }
  componentDidMount() {
    this.constructor();
  }

  update() {
    console.log("auth actualizando");
    new Auth();
    this.authenticated = true;
  }
  logout() {
    CookieService.remove("access_token");
    CookieService.remove("user");
    CookieService.remove("tipo");
    this.authenticated = false;
    // this.constructor();
    // this.tipo = "estudiante";
    console.log("Auth logout");
    //cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getTipo() {
    return this.tipo;
  }

  getUser() {
    return this.user;
  }

  getAccessToken() {
    return CookieService.get("access_token");
  }
}

export default withRouter(new Auth());
