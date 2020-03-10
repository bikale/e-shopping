const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoute = require('./route/admin');
const userRoute = require('./route/user');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'javaScript')));

app.use('/admin', adminRoute);
app.use(userRoute);




app.use((req, res, next) => {
  res.render('404');
});

mongoose
  .connect('mongodb://localhost:27017/onlineShopping', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server listening on http://localhost:5000');
    });
  })
  .catch(console.error);
