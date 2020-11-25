export class DefaultNormalizer {
  normalize(sentence) {
    return sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
  }
}
