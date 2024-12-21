const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/api/cv', (req, res) => {
  res.send('Hello from Netlify!');
});

module.exports = serverless(app);
