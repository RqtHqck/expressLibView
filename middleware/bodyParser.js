module.exports = (req, res, next) => {
  let body = "";

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (body) {
      try {
        req.body = JSON.parse(body); // Парсим тело запроса
      } catch (error) {
        // Отправляем ошибку и не вызываем next
        return res.status(400).send({ error: 'Invalid JSON' });
      }
    }
    next(); // Переходим дальше, если всё прошло успешно
  });
};
