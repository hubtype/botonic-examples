import { WordEmbeddingsConfig } from '@botonic/nlu/lib/types'
import { WordEmbeddingsManager } from '@botonic/nlu/lib/embeddings/word-embeddings-manager'

import { layers, sequential, Sequential } from '@tensorflow/tfjs-node'
import { DenseLayerArgs } from '@tensorflow/tfjs-layers/dist/layers/core'
import { LSTMLayerArgs, ModelCompileArgs } from '@tensorflow/tfjs-layers/dist'

interface LayersConfig {
  LSTM: LSTMLayerArgs
  DENSE: DenseLayerArgs
}

export const LSTMModel = async (
  maxSeqLen: number,
  wordEmbeddingsConfig: WordEmbeddingsConfig,
  layersConfig: LayersConfig,
  modelCompileArgs: ModelCompileArgs
): Promise<Sequential> => {
  const wordEmbeddingsManager = await WordEmbeddingsManager.withConfig(
    wordEmbeddingsConfig
  )
  const wordEmbeddingsMatrix = wordEmbeddingsManager.matrix
  const model = sequential()
  model.add(
    layers.embedding({
      inputDim: wordEmbeddingsMatrix.shape[0],
      outputDim: wordEmbeddingsMatrix.shape[1],
      inputLength: maxSeqLen,
      trainable: false,
      weights: [wordEmbeddingsMatrix],
    })
  )
  model.add(layers.lstm(layersConfig.LSTM))
  model.add(layers.dense(layersConfig.DENSE))
  model.compile(modelCompileArgs)
  model.summary()
  return model
}
