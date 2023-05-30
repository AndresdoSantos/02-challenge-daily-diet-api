import request from 'supertest'
import { describe, it } from 'vitest'

import { app } from '../app'

describe('Meals', () => {
  it('Should be able to create a new meal', async () => {
    await request(app.server)
      .post('/meals')
      .send({
        name: 'New meal',
        description: 'New meal description',
        inside_the_diet: false,
      })
      .expect(201)
  })
})
