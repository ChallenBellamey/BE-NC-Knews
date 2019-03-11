
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', articleTable => {
        articleTable
          .increments('article_id')
          .primary();
        articleTable
          .string('title')
          .notNullable();
        articleTable
          .text('body', 'UTF8')
          .notNullable();
        articleTable
          .integer('votes');
        articleTable
          .string('topic');
        articleTable
          .foreign('topic')
          .references('slug')
          .on('topics');
        articleTable
          .string('author');
        articleTable
          .foreign('author')
          .references('username')
          .on('users');
        articleTable
          .string('created_at');
      })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
