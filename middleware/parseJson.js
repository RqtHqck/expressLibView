module.exports = (req, res, next) => {
  // Добавляем метод res.send
  res.send = (data) => {
    res.writeHead(res.statusCode || 200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Переход к следующему middleware или обработчику
  next();
};
