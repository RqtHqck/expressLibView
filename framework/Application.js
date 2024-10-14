const EventEmitter = require('events')
const http = require('http')

module.exports = class Aplication {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }
  
  listen(port, callback) {
    this.server.listen(port, callback)
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }

  addRouter(router) {
    //Выбираем все ендпоинты
    Object.keys(router.endpoints).forEach(url_path => {
      // Создаём объект для простого обращения
      const endpoint = router.endpoints[url_path];
      // Перебираем метод ендпоинта
      Object.keys(endpoint).forEach((method) => {
        // Говорим серверу, что был создан роут.
        this.emitter.on(this._getRouterMask(url_path, method), (req, res) => {
          // Получаем handler по ключу method
          const handler = endpoint[method];
          // Вызываем обработчик роута 
          handler(req, res)
        })
      })
    })
  }

  addAllMiddlewares(req, res, callback) {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index];
        index++;
        middleware(req, res, next); // Запускаем текущий middleware и передаём next
      } else {
        callback(); // Когда все middlewares выполнены, вызываем callback (обработчик маршрута)
      }
    }
    next();
  }

  // Создаём сервер
  _createServer() {
    return http.createServer((req, res) => {
      // Запускаем все middleware
      this.addAllMiddlewares(req, res, () => {
        // Если все middleware выполнены, передаем запрос обработчику маршрута
        const emitted = this.emitter.emit(this._getRouterMask(req.parsedPathname, req.method), req, res);
        
        if (!emitted) {
          res.statusCode = 404; // Устанавливаем статус 404 для неизвестных маршрутов
          res.end(JSON.stringify({ error: 'Not Found' }));
        }
      });
    });
  }

  // Маска для сообщений события Router
  _getRouterMask(url_path, method) {
    return `[${url_path}]:[${method}]`
  }
}
