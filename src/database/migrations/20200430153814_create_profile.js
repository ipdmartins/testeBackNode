
exports.up = function (knex) {
    return knex.schema.createTable('profile', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('date').notNullable();
        table.string('publish').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('profile');
};
