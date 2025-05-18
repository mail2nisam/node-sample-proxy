const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/child_form_approval', createProxyMiddleware({
  target: 'https://sco-stage.cru.org',
  changeOrigin: true,
  pathRewrite: {
    '^/child_form_approval': '/child_form_approval'
  },
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0'); // Override GAS User-Agent
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
