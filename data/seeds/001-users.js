const bcrypt = require("bcryptjs")

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: 'backpackHero', 
          password: bcrypt.hashSync("1234", 12), 
          name: 'Janie Pro',
          age: 28,
          title: 'Professional Backpack Guide',
          tagline: 'I\'m the all around girl who loves backpacking',
          yearsAsGuide: 6
        },
        {
          username: 'scubascuba', 
          password: bcrypt.hashSync("1234", 12),
          name: 'Bill Water',
          age: 32,
          title: 'Professional Scuba Diver',
          tagline: 'Absolutely the best scuba diver in the world!',
          yearsAsGuide: 5
        },
        {
          username: 'gr8Guide', 
          password: bcrypt.hashSync("1234", 12)
        }
      ]);
    });
};
