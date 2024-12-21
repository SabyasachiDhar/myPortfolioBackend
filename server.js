const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
