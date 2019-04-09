
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert([
        {name: 'Periodic table symbols', description: 'front: element symbol, back: element name'},
        {name: 'NATO phonetic alphabet', description: 'front: letter, back: letter phonetic'},
      ]);
    });
};
