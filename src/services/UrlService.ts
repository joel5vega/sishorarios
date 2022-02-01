let apiDomain = ''
if (process.env.NODE_ENV === 'production') {
  apiDomain = "https://sishorarios.azurewebsites.net/public/";
} else {
  apiDomain = 'http://localhost:8000/';
  // apiDomain = "https://sishorarios.azurewebsites.net/public/";
}

class UrlService {
  static loginUrl() { return apiDomain + 'api/login'; }
  static apiUrl(){return apiDomain + 'api/';}
}

export default UrlService;