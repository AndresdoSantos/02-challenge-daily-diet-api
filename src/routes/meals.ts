/* eslint-disable camelcase */
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
      .select('id', 'name', 'description', 'inside_the_diet', 'created_at')

    return { meals }
  })

  app.get('/:id', async (request) => {
    const { userId } = request.cookies

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const meals = await knex('meals')
      .where({
        user_id: userId,
        id,
      })
      .select('id', 'name', 'description', 'inside_the_diet', 'created_at')

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

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const { userId } = request.cookies

    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      inside_the_diet: z.coerce.boolean().optional(),
      created_at: z.string().optional(),
    })

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { created_at, description, inside_the_diet, name } = bodySchema.parse(
      request.body,
    )

    const { id } = paramsSchema.parse(request.params)

    await knex('meals')
      .where({
        user_id: userId,
        id,
      })
      .update({
        created_at,
        description,
        inside_the_diet,
        name,
      })

    return reply.send()
  })

  app.delete('/:id', async (request, reply) => {
    const { userId } = request.cookies

    await knex('meals').where('user_id', userId).delete('*')

    return reply.status(204).send()
  })
}
