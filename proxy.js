const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Target Rails URL
const target = 'https://sco-stage.cru.org';

app.use(
  '*',
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('User-Agent', 'Google Apps Script');
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end('Something went wrong. Proxy error.');
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
