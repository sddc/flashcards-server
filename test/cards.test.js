process.env.NODE_ENV = 'test';

const knex = require('../db/knex');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('cards route', () => {
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

  describe('GET /api/cards/:deck_id', () => {
    it('should get all cards for a deck_id', () => {
      return request(app)
        .get('/api/cards/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an('array');
          response.body.every(card => expect(card).to.have.all.keys('id', 'front', 'back', 'easiness', 'repetitions', 'interval', 'next_review', 'deck_id'));
        });
    });
  });

  describe('GET /api/cards/:deck_id', () => {
    it('should fail to get all cards for an invalid deck_id', () => {
      return request(app)
        .get('/api/cards/3')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    });
  });


  describe('POST /api/cards/:deck_id', () => {
    it('should create a card', () => {
      return request(app)
        .post('/api/cards/1')
        .send({front: 'Be', back: 'Beryllium'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.have.all.keys('id', 'front', 'back', 'easiness', 'repetitions', 'interval', 'next_review', 'deck_id')
        });
    });
  });

  describe('POST /api/cards/:deck_id', () => {
    it('should fail to create a card for invalid deck id', () => {
      return request(app)
        .post('/api/cards/3')
        .send({front: 'test front', back: 'test back'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    });
  });


  describe('PUT /api/cards/:id', () => {
    it('should update a card', () => {
      return request(app)
        .put('/api/cards/5')
        .send({front: 'T', back: 'Tango'})
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

  describe('PUT /api/cards/:id', () => {
    it('should fail to update an invalid card id', () => {
      return request(app)
        .put('/api/cards/11')
        .send({front: 'T', back: 'Tango'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    });
  });

  describe('DELETE /api/cards/:id', () => {
    it('should delete a card', () => {
      return request(app)
        .delete('/api/cards/1')
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

  describe('DELETE /api/cards/:id', () => {
    it('should fail to delete an invalid card id', () => {
      return request(app)
        .delete('/api/cards/11')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
    });
  });

});
