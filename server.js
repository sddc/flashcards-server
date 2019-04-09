const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { errors } = require('celebrate');

const decks = require('./routes/api/decks');
const cards = require('./routes/api/cards');

const app = express();
const port = 5000;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// api routes
app.use('/api/decks', decks);
app.use('/api/cards', cards);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = app;
