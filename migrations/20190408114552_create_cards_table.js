
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', (table) => {
    table.increments();
    table.text('front');
    table.text('back');
    table.integer('deck_id').unsigned().notNullable();
    
    table.foreign('deck_id').references('id').inTable('decks');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
