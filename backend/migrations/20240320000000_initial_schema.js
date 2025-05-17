export function up(knex) {
  return knex.schema
    .createTable('blocks', (table) => {
      table.increments('id').primary();
      table.string('merkleRoot').notNullable();
      table.string('previousHash');
      table.integer('timestamp').notNullable();
      table.string('transactionId');
      table.timestamps(true, true);
    })
    .createTable('credentials', (table) => {
      table.string('hash').primary();
      table.text('merkleProof').notNullable();
      table.integer('blockId').unsigned();
      table.foreign('blockId').references('blocks.id');
      table.timestamps(true, true);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists('credentials')
    .dropTableIfExists('blocks');
} 