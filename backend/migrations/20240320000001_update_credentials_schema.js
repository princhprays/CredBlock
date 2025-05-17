/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // Check if the 'id' column exists
  const hasIdColumn = await knex.schema.hasColumn('credentials', 'id');
  
  if (!hasIdColumn) {
    // Create a new table with the desired schema
    await knex.schema.createTable('credentials_new', table => {
      table.increments('id').primary();
      table.string('hash', 255).notNullable();
      table.text('merkleProof').notNullable();
      table.integer('blockId').references('id').inTable('blocks');
      table.json('metadata').notNullable().defaultTo('{}');
      table.string('signature', 255).notNullable().defaultTo('');
      table.string('filePath', 255);
      table.string('blockchainTxId', 255);
      table.timestamps(true, true);
    });
    
    // Copy data from the old table to the new table, using default values for new columns
    await knex.raw(`
      INSERT INTO credentials_new (hash, merkleProof, blockId, created_at, updated_at)
      SELECT hash, merkleProof, blockId, created_at, updated_at FROM credentials
    `);
    
    // Drop the old table
    await knex.schema.dropTable('credentials');
    
    // Rename the new table to the original name
    await knex.schema.renameTable('credentials_new', 'credentials');
  } else {
    // If the 'id' column already exists, just add the new columns
    await knex.schema.alterTable('credentials', table => {
      table.json('metadata').notNullable().defaultTo('{}');
      table.string('signature', 255).notNullable().defaultTo('');
      table.string('filePath', 255);
      table.string('blockchainTxId', 255);
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('credentials', table => {
    // Drop new columns
    table.dropColumn('metadata');
    table.dropColumn('signature');
    table.dropColumn('filePath');
    table.dropColumn('blockchainTxId');
  });
} 