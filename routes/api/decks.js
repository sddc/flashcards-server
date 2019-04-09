const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

// get all decks
router.get('/', (req, res) => {
  knex('decks')
  .then((decks) => {
    res.json(decks);
  });
});

// create a deck
router.post('/', (req, res) => {
  const {name, description} = req.body;
  knex('decks').insert({name, description}, '*')
  .then((deck) => {
    res.json(deck);
  });
});

// update a deck
router.put('/:id', (req, res) => {
  const {name, description} = req.body;
  knex('decks').where('id', req.params.id).update({name, description})
  .then((deck) => {
    res.json(deck);
  });
});

// delete a deck and associated cards via ON DELETE CASCADE
router.delete('/:id', (req, res) => {
  knex('decks').where('id', req.params.id).del()
  .then(() => res.sendStatus(200));
});

module.exports = router;
