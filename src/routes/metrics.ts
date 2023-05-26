/* eslint-disable camelcase */
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

import { checkForCookies } from '../utils/check-for-cookies'

export async function metricsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', (request, reply, done) => {
    checkForCookies(request, reply)

    done()
  })

  app.get('', async (request) => {
    const { userId } = request.cookies

    const paramsSchema = z.object({
      insideTheDiet: z
        .enum(['false', 'true'])
        .transform((event) => event !== 'false'),
    })

    const { insideTheDiet } = paramsSchema.parse(request.query)

    const total = await knex('meals')
      .where({
        user_id: userId,
      })
      .count('id', { as: 'total' })
      .first()

    const inside = await knex('meals')
      .where({
        user_id: userId,
        inside_the_diet: insideTheDiet,
      })
      .count('inside_the_diet', { as: 'inside' })
      .first()

    // @ts-ignore
    return { ...total, ...inside, outside: total?.total - inside?.inside }
  })
}
