let apiDomain = ''
if (process.env.NODE_ENV === 'production') {
  apiDomain = "https://bkhorarios.azurewebsites.net/";
  //apiDomain = 'http://localhost:8000/';
} else {
  apiDomain = 'http://localhost:8000/';
  // apiDomain = "https://bkhorarios.azurewebsites.net/";
}

class UrlService {
  static loginUrl() { return apiDomain + 'api/login'; }
  static apiUrl(){return apiDomain + 'api';}
}

export default UrlService;