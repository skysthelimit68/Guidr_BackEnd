
exports.up = function(knex, Promise) {
  return knex.schema.createTable("trips", table => {
        table.increments()
        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        table.string("title", 256).notNullable()
        table.string("shortDescription", 1024)
        table.text("description")
        table.boolean("isProfessional").defaultTo(false)
        table.integer("type").notNullable()
            .unsigned()
            .references("id")
            .inTable("tripTypes")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
        table.integer("duration").unsigned().notNullable()
        table.integer("distance").unsigned()
        table.date("date").notNullable()
        table.string("image", 512)
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("trips")
};
