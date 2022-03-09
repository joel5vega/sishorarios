import axios from "axios";
import CookieService from "./CookieService";
import UrlService from "./UrlService";

interface Credentials {
  username: string;
  password: string;
}
const expiresAt = 60 * 24;
class AuthService {
  async doUserLogin(credentials: Credentials) {
    try {
      const response = await axios.post(UrlService.loginUrl(), credentials);
      console.log("Datos",response.data);
      alert("se logeo");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error", error.response);
      return false;
    }
  }
  handleLoginSucess(response: any, remember: boolean) {
    console.group("login")
    console.log(response);
    console.log("user is ", response.user);
    if (response.user) {
      var userId =response.user.id
    //   const options = { path: "/" };
    //   CookieService.set("access_token", response.access_token, options);
    //   CookieService.set("tipo", response.tipo, options);
    //   CookieService.set("user", response.user.id, options);
    //   return true;
    }
    else{
       userId = 1
    }
    let date = new Date();
    date.setTime(date.getTime() + expiresAt * 60 * 1000);
    const options = { path: "/", expires: date };
    CookieService.set("access_token", response.access_token, options);
    CookieService.set("tipo", response.tipo, options);
    CookieService.set("user", userId, options);
    console.groupEnd();
    return true;

  }
  handleLogout() {
    console.log("authService_logout");
    CookieService.remove("user");
    CookieService.remove("access_token");
    CookieService.remove("tipo");
  }
}

export default new AuthService();
