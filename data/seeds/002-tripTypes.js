
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tripTypes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tripTypes').insert([
        {type: 'backpacking', shortDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac."},
        {type: 'water sport', shortDescription:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat a tellus id maximus. Nulla facilisi. Praesent dictum neque nunc, vitae molestie massa porttitor ac."},
        {type: 'motor sport'}
      ]);
    });
};
