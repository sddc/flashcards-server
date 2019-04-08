const express = require('express');
const app = express();
const port = 5000;

const decks = require('./routes/api/decks');
const cards = require('./routes/api/cards');

app.use('/api/decks', decks);
app.use('/api/cards', cards);

app.listen(port, () => console.log(`app listening on port ${port}`));
