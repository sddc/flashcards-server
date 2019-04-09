const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');
const { celebrate, Joi } = require('celebrate');

// get all decks
router.get('/', (req, res) => {
  knex('decks')
  .then((decks) => {
    res.json(decks);
  });
});

// create a deck
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required()
  })
}), (req, res) => {
  const {name, description} = req.body;
  knex('decks').insert({name, description}, '*')
  .then((deck) => {
    res.json(deck[0]);
  });
});

// update a deck
router.put('/:id', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required()
  }),
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
}), (req, res, next) => {
  const {name, description} = req.body;
  knex('decks').where('id', req.params.id).update({name, description})
  .then((row) => {
    if(row) {
      res.json({message: 'update successful'});
    } else {
      next();
    }
  });
});

// delete a deck and associated cards via ON DELETE CASCADE
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.number().integer().positive().required()
  })
}), (req, res, next) => {
  knex('decks').where('id', req.params.id).del()
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
