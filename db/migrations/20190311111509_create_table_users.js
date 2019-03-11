
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', userTable => {
      userTable
        .string('username', 32)
        .primary()
        .notNullable();
      userTable
        .string('avatar_url');
      userTable
        .string('name', 32);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
