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
      return response.data;
    } catch (error) {
      console.error("Error", error.response);
      return false;
    }
  }
  handleLoginSucess(response: any, remember: boolean) {
    console.log(response, remember);

    if (!remember) {
      const options = { path: "/" };
      CookieService.set("access_token", response.access_token, options);
      return true;
    }
    let date = new Date();
    date.setTime(date.getTime() + expiresAt * 60 * 1000);
    const options = { path: "/", expires: date };
    CookieService.set("access_token", response.access_token, options);
    return true;
  }
  handleLogout() {
    console.log("authService_logout")
    CookieService.remove("access_token");
  }
}

export default new AuthService();
