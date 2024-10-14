module.exports = (baseUrl) => (req, res, next) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const params = {};
  parsedUrl.searchParams.forEach((value, key) => params[key] = value);
  // console.log(parsedUrl)
  req.parsedPathname = parsedUrl.pathname;  // Сохраняем pathname в объекте req
  req.params = params;
  next(); // Продолжаем цепочку middleware
};
