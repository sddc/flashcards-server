const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');
const { celebrate, Joi } = require('celebrate');

// get all cards from a deck
router.get('/:deck_id', celebrate({
  params: Joi.object().keys({
    deck_id: Joi.number().integer().positive().required()
  })
}), (req, res, next) => {
  // check if deck exists
  knex('decks').where('id', req.params.deck_id)
  .then((deck) => {
    if(deck.length > 0) {
      knex('cards').where('deck_id', req.params.deck_id)
      .then((cards) => {
        res.json(cards);
      });
    } else {
      next();
    }
  });
});

// create a card for a deck
router.post('/:deck_id', celebrate({
  body: Joi.object().keys({
    front: Joi.string().trim().min(1).required(),
    back: Joi.string().trim().min(1).required()
  }),
  params: Joi.object().keys({
    deck_id: Joi.number().integer().positive().required()
  })
}), (req, res, next) => {
  const {front, back} = req.body;
  const {deck_id} = req.params;
  knex('cards').insert({front, back, deck_id}, '*')
  .then((cards) => {
    res.json(cards[0]);
  })
  .catch(() => next());
});

// update a card
router.put('/:id', celebrate({
  body: Joi.object().keys({
    front: Joi.string().trim().min(1),
    back: Joi.string().trim().min(1),
    easiness: Joi.number().min(1.3),
    repetitions: Joi.number().integer().min(0),
    interval: Joi.number().integer().min(1),
    next_review: Joi.date().iso()
  }),
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
}), (req, res, next) => {
  const {front, back, easiness, repetitions, interval, next_review} = req.body;
  knex('cards').where('id', req.params.id).update({front, back, easiness, repetitions, interval, next_review})
  .then((row) => {
    if(row) {
      res.json({message: 'update successful'});
    } else {
      next();
    }
  });
});

// delete a card
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
}), (req, res, next) => {
  knex('cards').where('id', req.params.id).del()
  .then((row) => {
    // check if deleted a row
    if(row) {
      res.json({message: 'delete successful'});
    } else {
      next();
    }
  });
});

module.exports = router;
