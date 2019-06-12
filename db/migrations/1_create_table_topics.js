
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', topicTable => {
    topicTable
      .string('slug', 32)
      .primary();
    topicTable
      .string('description', 64)
      .notNullable();
    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
