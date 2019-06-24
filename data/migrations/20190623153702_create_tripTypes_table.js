
exports.up = function(knex, Promise) {
  return knex.schema.createTable("tripTypes", table => {
      table.increments().notNullable()
      table.string("type", 256).notNullable().unique()
      table.string("shortDescription", 1024)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("tripTypes")
};
