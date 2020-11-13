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
