import { Knex, knex as setupKnex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './db/app.db',
  },
}

export const knex = setupKnex(config)
