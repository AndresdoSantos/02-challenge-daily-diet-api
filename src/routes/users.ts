import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  app.get('', async () => {
    const users = await knex('users').select('*')

    return { users }
  })

  app.post('', async (request, reply) => {
    const userId = randomUUID()
    const oneWeek = 60000 * 60 * 24 * 7 // 1 week

    const bodySchema = z.object({
      name: z.string().max(60, 'Must have 60 characters.'),
      email: z.string().max(60, 'Must have 60 characters.').email(),
    })

    const { email, name } = bodySchema.parse(request.body)

    const emailAlreadyExists = await knex('users').where({ email }).first()

    if (emailAlreadyExists) {
      return reply.status(400).send({ message: 'E-mail already exists!' })
    }

    await knex('users').insert({
      email,
      name,
      id: userId,
    })

    reply.cookie('userId', userId, { maxAge: oneWeek, path: '/' })

    return reply.status(201).send()
  })
}
