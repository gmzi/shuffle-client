const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/recommendations', {
      target: 'https://shuffle-server.vercel.app/api',
      changeOrigin: true,
    })
  );
};
