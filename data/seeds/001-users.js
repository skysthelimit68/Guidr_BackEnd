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
          yearsAsGuide: 6,
          profilePic: "https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          coverPic: "https://images.pexels.com/photos/2526028/pexels-photo-2526028.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          username: 'scubascuba', 
          password: bcrypt.hashSync("1234", 12),
          name: 'Bill Water',
          age: 32,
          title: 'Professional Scuba Diver',
          tagline: 'Absolutely the best scuba diver in the world!',
          yearsAsGuide: 5,
          profilePic: "https://images.pexels.com/photos/555790/pexels-photo-555790.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          coverPic: "https://images.pexels.com/photos/1540108/pexels-photo-1540108.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          username: 'gr8Guide', 
          password: bcrypt.hashSync("1234", 12)
        }
      ]);
    });
};
