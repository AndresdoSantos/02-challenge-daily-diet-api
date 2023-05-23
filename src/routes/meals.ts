import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('', async () => {
    const meals = await knex('meals').select('*')

    return { meals }
  })

  app.post('', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string().nullable(),
      inside_the_diet: z.coerce.boolean(),
      user_id: z.string().uuid(), // Indexed?
    })

    const data = bodySchema.parse(request.body)
    console.log(data)
  })
}
