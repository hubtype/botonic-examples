import {
  BotonicInputTester,
  BotonicOutputTester,
  NodeApp,
} from '@botonic/react'

import { config } from '../src/'
import { locales } from '../src/locales'
import { plugins } from '../src/plugins'
import { routes } from '../src/routes'

const app = new NodeApp({ routes, locales, plugins, ...config })

const session = { user: { id: '123' } }
const input = new BotonicInputTester(app)
const output = new BotonicOutputTester(app)

test('TEST: (404) NOT FOUND', async () => {
  const response = await input.text('whatever', session)
  expect(response).toBe(output.text("I don't understand you"))
})

