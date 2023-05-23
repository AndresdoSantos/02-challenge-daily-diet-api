import fastify from 'fastify'

import { knex } from './database'

const app = fastify()

app.get('/hello', async (_, reply) => {
  const response = await knex('sqlite_schema').select('*')

  return reply.send(response)
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server is running on PORT: 3333')
  })
