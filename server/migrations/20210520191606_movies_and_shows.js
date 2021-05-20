
exports.up = function(knex) {
    return knex.schema
    .createTable('movies_and_shows', (table) => {
        table.increments()
        table.string('title').notNullable();
        table.enu('type', ['movie', 'show']);
        table.integer('year').notNullable();
        table.string('genre').notNullable();
        table.integer('rating').notNullable()
        table.string('image').notNullable()
        table.string('link').notNullable()
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('movies_and_shows')
};