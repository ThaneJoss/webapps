import { Hono } from 'hono'

import { appPipelineSeed, servicesSeed } from '../../shared/content.js'
import type {
  ApiFailure,
  ApiSuccess,
  ContactPayload,
  ContactReceipt,
  HealthStatus
} from '../../shared/types.js'

const app = new Hono()

const jsonSuccess = <T>(data: T) => ({ success: true, data }) satisfies ApiSuccess<T>

const jsonFailure = (code: string, message: string) =>
  ({ success: false, error: { code, message } }) satisfies ApiFailure

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)

app.get('/api/health', (context) => {
  const payload: HealthStatus = {
    ok: true,
    service: 'waas-api',
    version: 'v1',
    runtime: 'hono',
    timestamp: new Date().toISOString()
  }

  return context.json(jsonSuccess(payload))
})

app.get('/api/services', (context) => context.json(jsonSuccess(servicesSeed)))

app.get('/api/apps', (context) => context.json(jsonSuccess(appPipelineSeed)))

app.post('/api/contact', async (context) => {
  const body = (await context.req.json().catch(() => null)) as ContactPayload | null

  if (!body) {
    return context.json(
      jsonFailure('INVALID_JSON', 'Body must be valid JSON.'),
      400
    )
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return context.json(
      jsonFailure('VALIDATION_ERROR', 'Name, email, and message are required.'),
      400
    )
  }

  if (!isValidEmail(email)) {
    return context.json(
      jsonFailure('VALIDATION_ERROR', 'Please provide a valid email address.'),
      400
    )
  }

  const receipt: ContactReceipt = {
    submissionId: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    status: 'queued'
  }

  return context.json(jsonSuccess(receipt), 202)
})

app.notFound((context) =>
  context.json(jsonFailure('NOT_FOUND', 'The requested API route does not exist.'), 404)
)

app.onError((error, context) => {
  console.error(error)

  return context.json(
    jsonFailure('INTERNAL_ERROR', 'Unexpected server error.'),
    500
  )
})

export default app
