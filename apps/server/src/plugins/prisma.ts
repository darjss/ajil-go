import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

export default fp(async(fastify)=>{
  const prisma = new PrismaClient({
      log: ['query', 'error']
    })
  await prisma.$connect()
  fastify.decorate('prisma', prisma)
  fastify.addHook('onClose', async (fastifyInstance, done) => {
    await fastifyInstance.prisma.$disconnect()
    done()
  })
},{
  name: 'prisma-plugin'
})
