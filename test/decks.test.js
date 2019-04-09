process.env.NODE_ENV = 'test';

const knex = require('../db/knex');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('decks endpoint', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); })
    .then(() => done());
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => done());
  });
});
