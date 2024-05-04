import cors from '@fastify/cors'
import fastify from 'fastify'
import {
  // jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createAccount } from './routes/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cors)

app.register(createAccount)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running!')
})
