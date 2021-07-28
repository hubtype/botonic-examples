import { BotonicNLU } from '@botonic/nlu'
import { WordEmbeddingsConfig } from '@botonic/nlu/lib/types'
import { join } from 'path'
import { train } from '@tensorflow/tfjs-node'
import { DenseLayerArgs } from '@tensorflow/tfjs-layers/dist/layers/core'
import { LSTMLayerArgs, ModelCompileArgs } from '@tensorflow/tfjs-layers/dist'

import { tokenizer } from './preprocessing-tools/tokenizer'
import { DefaultNormalizer } from './preprocessing-tools/normalizer'
import { LSTMModel } from './lstm-model'
import { readdirSync } from 'fs'

// General
const LANGUAGE = 'en'
const UTTERANCES_PATH = join(
  process.cwd(),
  'src',
  'nlu',
  'utterances',
  LANGUAGE
)
const MAX_SEQ_LEN = 20
const INTENTS_COUNT = readdirSync(UTTERANCES_PATH).length

const nlu = new BotonicNLU({
  tokenizer: tokenizer,
  normalizer: new DefaultNormalizer(),
})
const data = nlu.readData({
  path: UTTERANCES_PATH,
  language: LANGUAGE,
  maxSeqLen: MAX_SEQ_LEN,
})
const [xTrain, xTest, yTrain, yTest] = nlu.trainTestSplit({
  data: data,
  testPercentage: 0.15,
  stratify: false,
})

// Model Config
const WE_CONFIG = {
  language: LANGUAGE,
  dimension: 50,
  type: 'glove',
  vocabulary: nlu.vocabulary,
} as WordEmbeddingsConfig

const LAYERS_CONFIG = {
  LSTM: {
    units: 32,
    dropout: 0.4,
    recurrentDropout: 0.4,
  } as LSTMLayerArgs,
  DENSE: {
    units: INTENTS_COUNT,
    activation: 'softmax',
  } as DenseLayerArgs,
}

// Training Config
const LEARNING_RATE = 5e-3
const MODEL_COMPILE_ARGS = {
  optimizer: train.adam(LEARNING_RATE),
  loss: 'sparseCategoricalCrossentropy',
  metrics: ['accuracy'],
} as ModelCompileArgs

const EPOCHS = 16

;(async () => {
  nlu.model = await LSTMModel(
    MAX_SEQ_LEN,
    WE_CONFIG,
    LAYERS_CONFIG,
    MODEL_COMPILE_ARGS
  )
  await nlu.train(xTrain, yTrain, { epochs: EPOCHS })
  await nlu.saveModel()
  console.log('Accuracy:', nlu.evaluate(xTest, yTest))
  console.log('Model saved.')
})()
