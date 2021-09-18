let apiDomain = ''
if (process.env.NODE_ENV === 'production') {
  apiDomain = "https://sishorarios.azurewebsites.net/public/";
} else {
  apiDomain = 'http://localhost:8000/';
}

class UrlService {
  static loginUrl() { return apiDomain + 'api/login'; }
}

export default UrlService;