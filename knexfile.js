// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://sd:pw@localhost/flashcards'
  },

  test: {
    client: 'pg',
    connection: 'postgres://sd:pw@localhost/flashcards_test'
  },

  production: {
    client: 'pg',
    connection: process.ENV.DATABASE_URL
  },

};
