
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', (table) => {
    table.increments();
    table.text('front');
    table.text('back');
    table.float('easiness').defaultTo(2.5);
    table.integer('repetitions').unsigned().defaultTo(0);
    table.timestamp('next_review').defaultTo(knex.fn.now());
    table.integer('deck_id').unsigned().notNullable();

    table.foreign('deck_id').references('id').inTable('decks').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
