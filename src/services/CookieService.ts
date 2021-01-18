import Cookie from "universal-cookie";

const cookie = new Cookie();

class CookieService {
  get(key: string) {
    return cookie.get(key);
  }
  set(key: string, value: string, options: Object) {
    cookie.set(key, value, options);
  }

  remove(key: string) {
    console.log("Cookie remove " + key);
    console.log(cookie.getAll());
    cookie.remove(key, { path: "/" });
    console.log(cookie.getAll());
  }
}

export default new CookieService();
