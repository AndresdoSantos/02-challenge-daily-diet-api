import fastify from 'fastify'

import { usersRoutes } from './routes/users'

const app = fastify()

app.register(usersRoutes, { prefix: 'users' })

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server is running on PORT: 3333')
  })
