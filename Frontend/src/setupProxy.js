import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    '/api/pexels',
    createProxyMiddleware({
      target: 'https://api.pexels.com',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/api/pexels': '/v1', // maps /api/pexels/search -> /v1/search
      },
      onProxyReq: (proxyReq, req, res) => {
        // add your Pexels key here (read from env on dev machine)
        // Make sure you add REACT_APP_PEXELS_KEY to your .env at project root.
        const key = process.env.REACT_APP_PEXELS_KEY;
        if (key) proxyReq.setHeader('Authorization', key);
      },
      logLevel: 'debug',
    })
  );
};
