

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
      table.increments();
      table.string("username", 256).notNullable().unique();
      table.string("password", 256).notNullable()
      table.string("name", 256)
      table.integer("age", 2).unsigned()
      table.string("title", 256)
      table.string("tagline", 512)
      table.integer("yearsAsGuide", 2) //experience as a guide in years
      
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users")
};
