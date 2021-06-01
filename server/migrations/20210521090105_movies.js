exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.integer("year").notNullable();
    table.string("genre").notNullable();
    table.integer("rating").notNullable();
    table.string("image").notNullable();
    table.string("link").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("movies");
};
