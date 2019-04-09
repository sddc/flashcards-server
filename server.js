const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

const decks = require('./routes/api/decks');
const cards = require('./routes/api/cards');

// api routes
app.use('/api/decks', decks);
app.use('/api/cards', cards);

app.listen(port, () => console.log(`app listening on port ${port}`));

module.exports = app;
