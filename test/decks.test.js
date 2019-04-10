process.env.NODE_ENV = 'test';

const knex = require('../db/knex');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('decks route', () => {
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

  describe('GET /api/decks', () => {
    it('should get all decks', () => {
      return request(app)
        .get('/api/decks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal([
            {id: 1, name: 'Periodic table symbols', description: 'front: element symbol, back: element name'},
            {id: 2, name: 'NATO phonetic alphabet', description: 'front: letter, back: letter phonetic'}
          ])
        });
    });
  });

  describe('POST /api/decks', () => {
    it('should create a deck', () => {
      return request(app)
        .post('/api/decks')
        .send({name: 'test deck', description: 'test deck description'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal({
            id: 3,
            name: 'test deck',
            description: 'test deck description'
          })
        });
    });
  });

  describe('PUT /api/decks/:id', () => {
    it('should update a deck', () => {
      return request(app)
        .put('/api/decks/1')
        .send({name: 'test deck', description: 'test deck description'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal({
            message: 'update successful'
          })
        });
    });
  });

  describe('PUT /api/decks/:id', () => {
    it('should fail to update an invalid deck id', () => {
      return request(app)
        .put('/api/decks/3')
        .send({name: 'test deck', description: 'test deck description'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    });
  });

  describe('DELETE /api/decks/:id', () => {
    it('should delete a deck', () => {
      return request(app)
        .delete('/api/decks/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal({
            message: 'delete successful'
          })
        });
    });
  });

  describe('DELETE /api/decks/:id', () => {
    it('should fail to delete an invalid deck id', () => {
      return request(app)
        .delete('/api/decks/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    });
  });

});
