const Application = require('./Application')

class Router {
  constructor() {
    this.endpoints = {}
  }
   
  // Обрабатывает добавление роутов
  request(method = 'GET', url_path, handler) {
    //  если нет такого ендпоинта
    if(!this.endpoints[url_path]) {
      // создаём на этот ендпоин пустой объект
      this.endpoints[url_path] = {}
    }
    // выносим в переменную
    const endpoint = this.endpoints[url_path]

    // Если есть такой ендпоинт
    if (endpoint[method]) {
      throw new error(`[${method}] по адресу ${url_path} уже существует`);
    }

    endpoint[method] = handler
  }

  
  get(url_path, handler) {
    this.request('GET', url_path, handler)
  }

  post(url_path, handler) {
    this.request('POST', url_path, handler)
  }

  put(url_path, handler) {
    this.request('PUT', url_path, handler)
  }

  delete(url_path, handler) {
    this.request('DELETE', url_path, handler)
  }
} 

module.exports = Router