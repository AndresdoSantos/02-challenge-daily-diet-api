import fastify from 'fastify'

import { knex } from './database/config'

const app = fastify()

app.get('/hello', async (_, reply) => {
  const response = await knex.select('*')

  return reply.send(response)
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server is running on PORT: 3333')
  })
