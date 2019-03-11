
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', commentTable => {
      commentTable
        .increments('comment_id');
      commentTable
        .string('author');
      commentTable
        .foreign('author')
        .references('username')
        .on('users');
      commentTable
        .integer('article_id');
      commentTable
        .foreign('article_id')
        .references('article_id')
        .on('articles');
      commentTable
        .integer('votes');
      commentTable
        .datetime('created_at');
      commentTable
        .text('body')
        .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
