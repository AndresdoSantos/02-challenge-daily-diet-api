import { describe, it } from 'vitest'
import request from 'supertest'

import { app } from '../app'

describe('Users', () => {
  it('Should be create a new user', async () => {
    await request(app.server)
      .post('users')
      .send({
        name: 'New user',
        email: 'newuser@gmail.com',
      })
      .expect(201)
  })
})
