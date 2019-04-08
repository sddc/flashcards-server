
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert([
        {id: 1, name: 'Periodic table symbols', description: 'front: element symbol, back: element name'},
        {id: 2, name: 'NATO phonetic alphabet', description: 'front: letter, back: letter phonetic'},
      ]);
    });
};
