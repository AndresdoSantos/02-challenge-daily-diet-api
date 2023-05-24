import { FastifyReply, FastifyRequest } from 'fastify'

export function checkForCookies(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.cookies

  if (!userId) {
    return reply.status(401).send({ message: 'Unalthorized.' })
  }
}
