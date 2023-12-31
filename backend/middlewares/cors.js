const allowedCors = [
  'http://localhost:3000',
  'http://oksifoxy.movie.nomore.nomoredomains.xyz',
  'http://api.oksifoxy.movie.nomoredomains.xyz',
  'https://oksifoxy.movie.nomore.nomoredomains.xyz',
  'https://api.oksifoxy.movie.nomoredomains.xyz',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = cors;
