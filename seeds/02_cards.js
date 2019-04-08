
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {id: 1, front: 'H', back: 'Hydrogen', deck_id: 1},
        {id: 2, front: 'Na', back: 'Sodium', deck_id: 1},
        {id: 3, front: 'C', back: 'Carbon', deck_id: 1},
        {id: 4, front: 'Ag', back: 'Silver', deck_id: 1},
        {id: 5, front: 'Xe', back: 'Xenon', deck_id: 1},

        {id: 6, front: 'A', back: 'Alpha', deck_id: 2},
        {id: 7, front: 'B', back: 'Bravo', deck_id: 2},
        {id: 8, front: 'C', back: 'Charlie', deck_id: 2},
        {id: 9, front: 'D', back: 'Delta', deck_id: 2},
        {id: 10, front: 'E', back: 'Echo', deck_id: 2}

      ]);
    });
};
