
exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', (table) => {
    table.increments();
    table.text('name');
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decks');
};
