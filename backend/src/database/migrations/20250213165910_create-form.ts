import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('forms', (table) => {
    table.increments('id').primary(),
      table.string('name').notNullable(),
      table.string('email').notNullable(),
      table.string('entidade').notNullable(),
      table.timestamp('createdAt').defaultTo(knex.fn.now()),
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('form')
}
