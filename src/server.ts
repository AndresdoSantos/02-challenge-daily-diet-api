import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'
import { metricsRoutes } from './routes/metrics'

const app = fastify()

app.register(cookie)

app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })
app.register(metricsRoutes, { prefix: 'metrics' })

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server is running on PORT: 3333')
  })
