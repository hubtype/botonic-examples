# NLU Assistant

This example shows you how to train a a model using Botonic NLU and take profit of it in order to recognize user intents. This example has been trained in order to recognize the following intents:

- `Greetings`: A user greets the bot. **e.g:** `hey!`
- `Jokes`: A user asks for a joke. **e.g:** `bot, tell me a joke`
- `GetDirections`: A user asks for directions. **e.g:** `how can I go to Barcelona?`
- `Weather`: A user asks for weather's information. **e.g:** `what's the weather like?`
- `Thanks`: A user thanks the bot. **e.g:** `thanks for your help!`
- `Farewell`: A user says goodbye to the bot. **e.g:** `ok, bye bye!`

**What's in this document?**

- [How to use this example](#how-to-use-this-example)
- [Walk-through](#walk-through)
  - [1. Create your knowledge base](#1-create-your-knowledge-base)
  - [2. Creating your Neural Network model](#2-creating-your-neural-network-model)
    - [2.1 Understanding the main points of a model](#21-understanding-the-main-points-of-a-model)
    - [2.2 Creating your own custom model](#22-creating-your-own-custom-model)
    - [2.3 Creating your own custom data preprocessors](#23-creating-your-own-custom-data-preprocessors)
      - [2.3.1 Creating a custom tokenizer](#231-creating-a-custom-tokenizer)
      - [2.3.2 Creating a custom normalizer](#232-creating-a-custom-normalizer)
    - [2.4 Using your own custom model](#24-using-your-own-custom-model)
      - [2.4.1 Initializing the NLU with custom preprocessors](#241-initializing-the-nlu-with-custom-preprocessors)
      - [2.4.2 Preparing the data](#242-preparing-the-data)
      - [2.4.3 Model configuration and tunning](#243-model-configuration-and-tunning)
      - [2.4.4 Training and evaluating the model](#244-training-and-evaluating-the-model)
    - [2.5 Run the model](#25-run-the-model)
  - [3. Defining the conversational flow](#3-defining-the-conversational-flow)
  - [4. Using the Botonic NLU plugin](#4-using-the-botonic-nlu-plugin)

## How to use this example

1. From your command line, download the example by running:
   ```bash
   $ botonic new <botName> nlu-assistant
   ```
2. `cd` into `<botName>` directory that has been created.
3. Run `botonic serve` to test it in your local machine.

Additionally, you can try to add new examples in **src/nlu/utterances/en** and train the model again by running:

```bash
$ botonic train
```

Now you can test how this new model performs by running `botonic serve` again and try with new inputs.

## Walk-through

In this walk-through we will cover the most important steps that has been done in order to develop this example.

#### 1. Create your knowledge base

First of all, we need to define some training examples to feed our neural network (**NN**). To do so, we are going to create **6** different files, one for each intent. Under **src/nlu/utterances/en/** create the following files:

- `Greeting.txt`
- `Joke.txt`
- `GetDirections.txt`
- `Weather.txt`
- `Thanks.txt`
- `Farewell.txt`

Now, inside every one of them, add several examples as follows:

**src/nlu/utterances/en/GetDirections.txt**

```
how can i reach a train station?
get directions to the nearest ATM
how do I get home taking E120
find the fastest route to Baxter Building 42nd street Madison Avenue Manhattan
how to get to the Main Street avoiding heavy traffic
...
```

Each example should be defined in single line and should be separated of the next one by a newline.

> **Note:** Take into account that in Deep Learning models, the more examples you train with, the better the neural network will perform. For the sake of this example, we have added 50 examples per intent (but they could be insufficient).

Once you have defined all the examples for every intent, we are going to proceed with the model creation.

#### 2. Creating your Neural Network model

Under **src/nlu/** you will notice that there is a `train-model.ts` file. This is the main entry point responsible of running your model.

##### 2.1 Understanding the main points of a model

We could start by using the example which comes with the `nlu` example:

```ts
import { BotonicNLU, ModelTemplatesType } from '@botonic/nlu'
import { join } from 'path'

const LANGUAGE = 'en'
const UTTERANCES_PATH = join(
  process.cwd(),
  'src',
  'nlu',
  'utterances',
  LANGUAGE
)

const nlu = new BotonicNLU()
const data = nlu.readData({
  path: UTTERANCES_PATH,
  language: LANGUAGE,
  maxSeqLen: 20,
})

const [xTrain, xTest, yTrain, yTest] = nlu.trainTestSplit({
  data: data,
  testPercentage: 0.1,
})

;(async () => {
  await nlu.createModel({
    template: ModelTemplatesType.SIMPLE_NN,
    learningRate: 5e-3,
    trainableEmbeddings: true,
  })
  await nlu.train(xTrain, yTrain, { epochs: 8 })
  await nlu.saveModel()
  console.log('Accuracy:', nlu.evaluate(xTest, yTest))
  console.log('Model saved.')
})()
```

Let's break it down into little pieces:

1. First of all, you need to define which is the target language to be trained. You must specify both the language and the directory from where the utterances will be retrieved:
   ```ts
   const LANGUAGE = 'en'
   const UTTERANCES_PATH = join(
     process.cwd(),
     'src',
     'nlu',
     'utterances',
     LANGUAGE
   )
   ```
2. Now we will initialize an instance of `BotonicNLU` and feed it with our data:
   ```ts
   const nlu = new BotonicNLU()
   const data = nlu.readData({
     path: UTTERANCES_PATH,
     language: LANGUAGE,
     maxSeqLen: 20,
   })
   ```
   `maxSeqLen` defines the maximum length of the sequences generated to train the NN (_it's pretty uncommon that a user types an input of more of 20 words_).
3. Before start training our model, we need to split the data into two sets; one for training and one for evaluating the model. This can be done with:
   ```ts
   const [xTrain, xTest, yTrain, yTest] = nlu.trainTestSplit({
     data: data,
     testPercentage: 0.1,
   })
   ```
   `testPercentage` is the percentage of examples that will be used to do the evaluation.
4. Finally, we will use a predefined template of NN to do the training:

   ```ts
   ;(async () => {
     await nlu.createModel({
       template: ModelTemplatesType.SIMPLE_NN,
       learningRate: 5e-3,
       trainableEmbeddings: true,
     })
     await nlu.train(xTrain, yTrain, { epochs: 8 })
     await nlu.saveModel()
     console.log('Accuracy:', nlu.evaluate(xTest, yTest))
     console.log('Model saved.')
   })()
   ```

   We won't go over the details a this moment, but it's important you notice that the main logic here consists of: specifying a model, training it during some epochs and finally save and evaluate the results.

5. Now run `botonic train`.

   **Output:**

   ```
   ...
   3283ms 15198us/step - acc=1.00 loss=8.80e-4 val_acc=0.167 val_loss=6.70
   Accuracy: 0.6333333333333333
   Model saved.
   ```

   As you can see, the `acc` (training accuracy) is high, and `val_acc` (validation accuracy) is low. This means that our network learned to correctly classify the inputs that it has already seen during the training, but the performance when seeing new examples is really poor. This problem is also known as **Overffiting**.

We could try to do lots of changes within this code, but we will never obtain significantly better results. To address this problem we are going to try the other way of implementing a model. This option offers the possibility of creating a custom model without using any template.

##### 2.2 Creating your own custom model

In this example, we are going to create a common model's configuration in terms of natural language processing. The sequential model is composed of three different layers: an **Embedding** layer, an **LSTM** (Long Short-Term Memory) layer, and finally a **Dense** layer with a `softmax` activation function to compute all intent probabilities.

Let's start by creating a new file called `lstm-model.ts` under **src/nlu/**.

Using the power of [tfjs](https://www.tensorflow.org/js) you can define a new model as follows:

**src/nlu/train-model.ts**

```ts
import { WordEmbeddingsConfig } from '@botonic/nlu/dist/types'
import { WordEmbeddingsManager } from '@botonic/nlu/dist/embeddings/word-embeddings-manager'

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
```

We have defined here the interface `LayersConfig` to be able to tune the model easily from the outside. In this piece of we are:

1.  Loading the matrix of word embeddings needed to initialize the embedding layer.
    ```ts
    const wordEmbeddingsManager = await WordEmbeddingsManager.withConfig(
      wordEmbeddingsConfig
    )
    const wordEmbeddingsMatrix = wordEmbeddingsManager.matrix
    ```
2.  Place the embedding layer as the first layer in the stack:
    ```ts
    const model = sequential() // initializing the stack of layers
    model.add(
      layers.embedding({
        inputDim: wordEmbeddingsMatrix.shape[0],
        outputDim: wordEmbeddingsMatrix.shape[1],
        inputLength: maxSeqLen,
        trainable: false,
        weights: [wordEmbeddingsMatrix],
      })
    )
    ```
    > **Note:** It's very important you define correctly these parameters for a correct functioning of the model.
    >
    > - **`inputDim`**: size of the vocabulary.
    > - **`outputDim`**: size of the pretrained embedding vectors.
    > - **`inputLength`**: must be the `maxSeqLen`.
    > - **`trainable`**: whether to freeze the weights of WE or leave them to variate. If you want to take all the profit of word embeddings, set it to `false`.
    >   **`weights`**: Loaded word embeddings matrix.
3.  Add the rest of layers:
    ```ts
    model.add(layers.lstm(layersConfig.LSTM))
    model.add(layers.dense(layersConfig.DENSE))
    ```
4.  Configure and prepare the model for training and evaluation.
    ```ts
    model.compile(modelCompileArgs) model.summary()
    ```

##### 2.3 Creating your own custom data preprocessors

In certain situations, you would want to tell `BotonicNLU` how to preprocess the data (removing accents, question marks, ...). To do so, `BotonicNLU` let's you to inject your own `tokenizer`, `normalizer` and/or `stemmer`. In this example we are going to use a custom `tokenizer` and `normalizer`. In order to maintain the project cleaner, we have created a `preprocessing-tools` directory in **src/nlu/**.

###### 2.3.1 Creating a custom tokenizer

**src/nlu/preprocessing-tools/tokenizer.ts**

```ts
const TreebankWordTokenizer = require('natural/lib/natural/tokenizers/treebank_word_tokenizer')

export const tokenizer = new TreebankWordTokenizer()
```

In this example, we will be using [`natural`](https://github.com/NaturalNode/natural#tokenizers)'s `TreebankWordTokenizer` which works well for every language. To define your tokenizer, the only requirement is to export a class that implements a `tokenize` method.

> **Note:** As `natural` is a library centered on Node and we need to have the bot working in a browser environment, we have to require the class explicitly from the absolute path.

###### 2.3.2 Creating a custom normalizer

**src/nlu/preprocessing-tools/normalizer.ts**

```ts
export class DefaultNormalizer {
  normalize(sentence) {
    return sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
  }
}
```

In this normalizer, we are removing special characters we don't want to trait when the user enters an input. As well as `tokenizer`, this class must implement a `normalize` method.

##### 2.4 Using your own custom model

Now, let's move again to **src/nlu/train-model.ts**.

###### 2.4.1 Initializing the NLU with custom preprocessors

**src/nlu/train-model.ts**

```ts
import { BotonicNLU } from '@botonic/nlu'
import { join } from 'path'
import { train } from '@tensorflow/tfjs-node'
import { DenseLayerArgs } from '@tensorflow/tfjs-layers/dist/layers/core'
import { LSTMLayerArgs, ModelCompileArgs } from '@tensorflow/tfjs-layers/dist'

import { tokenizer } from './preprocessing-tools/tokenizer'
import { DefaultNormalizer } from './preprocessing-tools/normalizer'
import { LSTMModel } from './lstm-model'
import { readdirSync } from 'fs'

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
```

Call `BotonicNLU` constructor and initialize it by passing your imported tokenizer and normalizer.

###### 2.4.2 Preparing the data

**src/nlu/train-model.ts** (continuation)

```ts
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
```

At this point, you only had to call `readData` and all the preprocessing will be handled internally with the preprocesors you have injected before. As we have an homogenized distribution of the data (same number of examples per intent), we will be setting `stratify` option to `false`.

###### 2.4.3 Model configuration and tunning

**src/nlu/train-model.ts** (continuation)

```ts
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
```

Time to configure our model.

- **Word Embeddings**:
  - Here we have chosen [`glove`](https://nlp.stanford.edu/projects/glove/) `50d` pretrained word embeddings. We must pass here the vocabulary extracted from previous data processing.
- **LSTM Layer**:
  - As we said before, we want our model to be less rigid when predicting over new inputs. To achive that, we use a technique called `regularization` that can be done by specifying `dropout` parameters to this layer. Also, reducing the number of `units` (neurons per layer) will help.
- **Dense Layer**:
  - This is the very last layer and **must** have as many units as intents we are targeting. We have to make use of `softmax` activation as we want to compute the probabilities of intents so the sum of all of them is equal to 1.

###### 2.4.4 Training and evaluating the model

**src/nlu/train-model.ts** (continuation)

```ts
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
```

Now we have to add the compilation parameters for our model, this is: choosing an `optimizer`, a `loss` (`sparseCategoricalCrossentropy` for multiple classes) and the `metrics` we want to track. Here the most obvious option is to use the `accuracy` metric.
Finally, we put all the pieces together so we:

1. Assign our model to current `nlu` instance with `nlu.model`.
2. Do iterative cycles of training during the defined number of `epochs`.
3. Save the model.
4. Evaluate it.

##### 2.5 Run the model

Now, run `botonic train` to train with your custom model.

**Output:**

```
...
1979ms 9703us/step - acc=0.897 loss=0.261 val_acc=0.961 val_loss=0.154
Accuracy: 0.8888888888888888
Model saved.
```

As you can see, we have been able to increase our accuracy up to a 88% and have more closer values between `acc` and `val_acc` which are good signs that our model is working properly. Also the values for both losses are decreasing over every training epoch. So we are now ready to define our conversational flow!

> **Note:** These results are not deterministic because NN weights are initialized with random values, so maybe you have to run the `botonic train` script various times before obtaining a convincing result.

#### 3. Defining the conversational flow

Once we have our model trained, the necessary information to make predictions will be stored under **src/nlu/models/en/** directory.
We can now move on and declare with what actions must respond the bot for every intent. We have created one class per intent with the same name, to be easier to identify.

**src/routes.js**

```javascript
import Greetings from './actions/Greetings'
import Farewell from './actions/Farewell'
import Jokes from './actions/Jokes'
import GetDirections from './actions/GetDirections'
import Weather from './actions/Weather'
import Thanks from './actions/Thanks'
import NotFound from './actions/NotFound'

const withConfidence = (input, intent) =>
  input.intent === intent && input.confidence >= 0.6

export const routes = [
  { input: i => withConfidence(i, 'Greetings'), action: Greetings },
  { input: i => withConfidence(i, 'Farewell'), action: Farewell },
  { input: i => withConfidence(i, 'Jokes'), action: Jokes },
  { input: i => withConfidence(i, 'GetDirections'), action: GetDirections },
  { input: i => withConfidence(i, 'Weather'), action: Weather },
  { input: i => withConfidence(i, 'Thanks'), action: Thanks },
  { path: '404', action: NotFound },
]
```

As you would observe, here we don't want to trigger actions if the confidence for an input is lower than a 60%. We have encapsulated this logic into the `withConfidence` function, that also checks if the returned intent for input is the same that we are expecting. If user input has predicted an intent with equal or more accuracy of 60%, it will trigger automatically the specified action. It's that easy!

> We are not covering the implementation of the actions in this explanation, but you could put it there whatever logic you want.

#### 4. Using the Botonic NLU plugin

Last step, but no less important, is to load the Botonic NLU plugin in **src/plugins.js** file, which is the one who knows how to run the predictions in a browser environment.

**src/plugins.js**

```javascript
import { tokenizer } from './nlu/preprocessing-tools/tokenizer'
import { DefaultNormalizer } from './nlu/preprocessing-tools/normalizer'

export const plugins = [
  {
    id: 'nlu',
    resolve: require('@botonic/plugin-nlu'),
    options: {
      en: {
        tokenizer: tokenizer,
        normalizer: new DefaultNormalizer(),
      },
    },
  },
]
```

Here the most important thing is that you **must** initialize every language you want your bot supports with its locale code (`en` in this example) and use pass as configuration the same tokenizer and normalizer we have used to train the model. Otherwise, your results will differ from the ones obtained in the training.

Finally run `botonic serve` to try the bot and deploy it where you desire... and we are done! 🎉
