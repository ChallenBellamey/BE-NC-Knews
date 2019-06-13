
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', userTable => {
      userTable
        .string('username', 32)
        .primary()
        .notNullable();
      userTable
        .string('password', 32)
        .notNullable();
      userTable
        .string('name', 32);
      userTable
        .string('about', 64);
      userTable
        .timestamp('last_online')
        .notNullable()
        .defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
