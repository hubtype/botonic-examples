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

test('TEST: hi.js', async () => {
  const response = await input.text('Hi', session)
  await expect(response).toBe(
    output.text(
      'Hi! Choose what you want to eat:',
      output.replies(
        { text: 'Pizza', payload: 'pizza' },
        { text: 'Pasta', path: 'pasta' }
      )
    )
  )
})

test('TEST: pizza.js', async () => {
  const response = await input.payload('pizza', session, 'hi')
  expect(response).toBe(
    output.text(
      'You chose Pizza! Choose one ingredient:',
      output.replies(
        { text: 'Sausage', payload: 'sausage' },
        { text: 'Bacon', payload: 'bacon' }
      )
    )
  )
})

test('TEST: sausage.js', async () => {
  const response = await input.payload('sausage', session, 'hi/pizza')
  expect(response).toBe(
    output.text('You chose Sausage on Pizza')
  )
})

test('TEST: bacon.js', async () => {
  const response = await input.path('bacon', session, 'hi/pizza')
  expect(response).toBe(
    output.text('You chose Bacon on Pizza')
  )
})

test('TEST: pasta.js', async () => {
  const response = await input.payload('pasta', session, 'hi')
  expect(response).toBe(
    output.text(
      'You chose Pasta! Choose one ingredient:',
      output.replies(
        { text: 'Cheese', payload: 'cheese' },
        { text: 'Tomato', payload: 'tomato' }
      )
    )
  )
})

test('TEST: cheese.js', async () => {
  const response = await input.payload('cheese', session, 'hi/pasta')
  expect(response).toBe(
    output.text('You chose Cheese on Pasta')
  )
})

test('TEST: tomato.js', async () => {
  const response = await input.path('tomato', session, 'hi/pasta')
  expect(response).toBe(
    output.text('You chose Tomato on Pasta')
  )
})

test('TEST: (404) NOT FOUND', async () => {
  const response = await input.text('whatever', session) 
  expect(response).toBe(
    output.text("I don't understand you")
  )
})
