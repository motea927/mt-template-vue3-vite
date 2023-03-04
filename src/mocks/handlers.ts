import { rest, createResponseComposition, context } from 'msw'
import { product } from './mockData'

const delayedResponse = createResponseComposition(undefined, [context.delay(500)])

export const handlers = [
  rest.get('/api/product', (_req, _res, ctx) => {
    return delayedResponse(ctx.status(200), ctx.json(product))
  })
]
