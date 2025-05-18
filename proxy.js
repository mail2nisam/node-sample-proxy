// proxy.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.all('/proxy/*', async (req, res) => {
  try {
    // Extract the target URL from the path
    const targetUrl = req.originalUrl.replace('/proxy/', '');

    // Forward the method, headers and body
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(targetUrl).host, // Fix host header
      },
      body: req.method === 'GET' || req.method === 'HEAD' ? null : JSON.stringify(req.body),
    });

    const text = await response.text();

    // Respond with the same status and body
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
