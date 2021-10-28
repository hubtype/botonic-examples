export const plugins = [
  {
    id: 'intent-classification',
    resolve: require('@botonic/plugin-intent-classification'),
    options: {
      locales: ['en'],
    },
  },
]
