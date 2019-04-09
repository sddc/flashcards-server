
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {front: 'H', back: 'Hydrogen', deck_id: 1},
        {front: 'Na', back: 'Sodium', deck_id: 1},
        {front: 'C', back: 'Carbon', deck_id: 1},
        {front: 'Ag', back: 'Silver', deck_id: 1},
        {front: 'Xe', back: 'Xenon', deck_id: 1},

        {front: 'A', back: 'Alpha', deck_id: 2},
        {front: 'B', back: 'Bravo', deck_id: 2},
        {front: 'C', back: 'Charlie', deck_id: 2},
        {front: 'D', back: 'Delta', deck_id: 2},
        {front: 'E', back: 'Echo', deck_id: 2}

      ]);
    });
};
