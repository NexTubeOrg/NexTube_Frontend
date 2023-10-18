const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('proxy works!!!');
  app.use(
    '/api/', // Replace with your API endpoint
    createProxyMiddleware({
      target: 'https://localhost:7192', // Replace with your API URL
      changeOrigin: true,
    }),
  );
};
