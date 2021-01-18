import AuthService from "./../../../../services/AuthService";
import CookieService from "../../../../services/CookieService";
import { withRouter } from "react-router-dom";
class Auth {
  constructor() {
    this.authenticated = false;
    const token = CookieService.get("access_token");
    token ? (this.authenticated = true) : (this.authenticated = false);
  }
  componentDidMount() {
    this.constructor();
  }
  /*
  async login(credentails, cb) {
    const user = await AuthService.doUserLogin(credentails);

    if (!user) {
      cb(false);
      return false;
    }

    localStorage.setItem("accessToken", user.access_token);
    this.authenticated = true;
    cb(true);
  }
*/
  update() {
     console.log("auth actualizando");
    new Auth();
    this.authenticated = true;
  }
  logout() {
    console.log("Auth logout")
    CookieService.remove("access_token");
    this.authenticated = false;
    //cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getAccessToken() {
    return CookieService.get("access_token");
  }
}

export default withRouter(new Auth());
