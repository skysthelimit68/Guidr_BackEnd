const bcrypt = require("bcryptjs")

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'backpackHero', password: bcrypt.hashSync("1234", 12)},
        {username: 'scubascuba', password: bcrypt.hashSync("1234", 12)},
        {username: 'gr8Guide', password: bcrypt.hashSync("1234", 12)}
      ]);
    });
};
