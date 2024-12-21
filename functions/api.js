const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mycvdatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const cvSchema = new mongoose.Schema({
  name: String
});

const CV = mongoose.model('CV', cvSchema);

app.post('/api/cv', async (req, res) => {
  try {
    const newCV = new CV(req.body);
    const savedCV = await newCV.save();
    res.status(200).send(savedCV);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/cv', (req, res) => {
  res.send('Hello from Netlify!');
});

module.exports.handler = serverless(app);
