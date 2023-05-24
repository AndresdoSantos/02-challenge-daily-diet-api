import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'

import { checkForCookies } from '../utils/check-for-cookies'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', (request, reply, done) => {
    checkForCookies(request, reply)

    done()
  })

  app.get('', async (request) => {
    const { userId } = request.cookies

    const meals = await knex('meals')
      .where({
        user_id: userId,
      })
      .select('*')

    return { meals }
  })

  app.post('', async (request, reply) => {
    const { userId } = request.cookies

    const bodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      inside_the_diet: z.coerce.boolean(),
    })

    const data = bodySchema.parse(request.body)

    await knex('meals').insert({
      id: randomUUID(),
      name: data.name,
      description: data.description || '',
      inside_the_diet: data.inside_the_diet,
      user_id: userId,
    })

    return reply.status(201).send({ message: 'Created!' }) // Return ID?
  })
}
