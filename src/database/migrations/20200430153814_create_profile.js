
exports.up = function (knex) {
    return knex.schema.createTable('profile', function (table) {
        table.string('id').primary();
        table.string('userName').notNullable();
        table.string('imageAvatar');
        table.string('date').notNullable();
        table.string('imagePublish');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('profile');
};
