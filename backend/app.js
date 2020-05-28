const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
});

mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb+srv://Rajasi:zqnvO1VeFsc3Neae@cluster0-aytnn.mongodb.net/mean-stack?retryWrites=true&w=majority",
 { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Database');
})
.catch((err) => {
  console.log('Connection failed');
  console.log(err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
