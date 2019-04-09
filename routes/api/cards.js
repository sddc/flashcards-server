const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');

// get all cards from a deck
router.get('/:deck_id', (req, res) => {
  knex('cards').where('deck_id', req.params.deck_id)
  .then((cards) => {
    res.json(cards);
  });
});

// create a card for a deck
router.post('/:deck_id', (req, res) => {
  const {front, back} = req.body;
  const {deck_id} = req.params;
  knex('cards').insert({front, back, deck_id}, '*')
  .then((card) => {
    res.json(card);
  });
});

// update a card
router.put('/:id', (req, res) => {
  const {front, back} = req.body;
  knex('cards').where('id', req.params.id).update({front, back})
  .then((card) => {
    res.json(card);
  });
});

// delete a card
router.delete('/:id', (req, res) => {
  knex('cards').where('id', req.params.id).del()
  .then(() => res.sendStatus(200));
});

module.exports = router;
