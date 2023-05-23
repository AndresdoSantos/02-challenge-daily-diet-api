import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id')

    table.string('name').notNullable()

    table.string('description')

    table.boolean('inside_the_diet').defaultTo(false).notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()

    table.uuid('user_id').unsigned()

    table.foreign('user_id').references('users.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
