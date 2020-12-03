const path = require('path')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')

const root = path.resolve(__dirname, 'src')
const botonicPath = path.resolve(__dirname, 'node_modules', '@botonic', 'react')

const terserPlugin = new TerserPlugin({
  // TODO: configure sourceMaps not working
  parallel: true,
  // sourceMap: true,
  terserOptions: {
    keep_fnames: true,
  },
})

const MODE_DEV = 'development'
const MODE_PROD = 'production'

const BOTONIC_TARGETS = {
  DEV: 'dev',
  NODE: 'node',
  WEBVIEWS: 'webviews',
  WEBCHAT: 'webchat',
}

function sourceMap(mode) {
  // changing it from inline-source-map to cheap-eval-source-map, build time improved from 48s to 40s
  if (mode === MODE_PROD) {
    // Typescript: "inline-source-map" does not map Typescript correctly but there's a patch I didn't test https://github.com/webpack/webpack/issues/7172#issuecomment-414115819
    // from https://webpack.js.org/configuration/devtool/ inline-source-map is slow and not good for production
    //return 'cheap-eval-source-map'; // fast builds, not for production, transformed code (lines only)
    // slow, good for production. A full SourceMap is emitted as a separate file. but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools.
    return 'hidden-source-map'
  } else if (mode === MODE_DEV) {
    // 'eval-source-map' would be a good fit for staging (slow but generates original code)
    // from documentation: quick build time, very quick rebuild, transformed code (lines only)
    return 'eval-cheap-source-map' //callstacks show links to TS code
  } else {
    throw new Error(
      'Invalid mode argument (' + mode + '). See package.json scripts'
    )
  }
}

const resolveConfig = {
  extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  // fallback: { url: require.resolve('url') },
  // fallback: { url: false }, // core's url to be replaced
}

const babelLoaderConfig = {
  test: /\.?(j|t)s?x/,
  exclude: /node_modules[\/\\](?!(@botonic)[\/\\])/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env', '@babel/react'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-add-module-exports',
        '@babel/plugin-transform-runtime',
      ],
    },
  },
}
const babelLoaderConfig2 = {
  test: /\.?js/,
  exclude: /node_modules[\/\\](?!(react-children-utilities)[\/\\])/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env', '@babel/react'],
      plugins: ['babel-plugin-add-import-extension'],
    },
  },
}

const fileLoaderConfig = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: 'assets',
      },
    },
  ],
}

const nullLoaderConfig = {
  test: /\.(scss|css)$/,
  use: 'null-loader',
}

const stylesLoaderConfig = {
  test: /\.(scss|css)$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
}

const imageminPlugin = new ImageMinimizerPlugin({
  minimizerOptions: {
    plugins: [
      ['gifsicle', { interlaced: true }],
      ['jpegtran', { progressive: true }],
      ['optipng', { optimizationLevel: 5 }],
      [
        'svgo',
        {
          plugins: [
            {
              removeViewBox: false,
            },
          ],
        },
      ],
    ],
  },
})

function botonicDevConfig(mode) {
  return {
    mode: mode,
    devtool: sourceMap(mode),
    target: 'web',
    entry: path.resolve('webpack-entries', 'dev-entry.js'),
    module: {
      rules: [
        babelLoaderConfig,
        babelLoaderConfig2,
        fileLoaderConfig,
        stylesLoaderConfig,
      ],
    },
    output: {
      filename: 'webchat.botonic.js',
      library: 'Botonic',
      libraryTarget: 'umd',
      libraryExport: 'app',
    },
    resolve: resolveConfig,
    devServer: {
      static: [
        path.join(__dirname, 'dist'),
        path.join(__dirname, 'src', 'nlu', 'models'),
      ],
      liveReload: true,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(botonicPath, 'src', 'webchat.template.html'),
        filename: 'index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
      imageminPlugin,
      new webpack.EnvironmentPlugin({
        HUBTYPE_API_URL: null,
        BOTONIC_TARGET: BOTONIC_TARGETS.DEV,
      }),
    ],
  }
}

function botonicWebchatConfig(mode) {
  return {
    optimization: {
      minimize: true,
      minimizer: [terserPlugin],
    },
    mode: mode,
    devtool: sourceMap(mode),
    target: 'web',
    entry: path.resolve('webpack-entries', 'webchat-entry.js'),
    module: {
      rules: [
        babelLoaderConfig,
        babelLoaderConfig2,
        fileLoaderConfig,
        stylesLoaderConfig,
      ],
    },
    output: {
      filename: 'webchat.botonic.js',
      library: 'Botonic',
      libraryTarget: 'umd',
      libraryExport: 'app',
      publicPath: './',
    },
    resolve: resolveConfig,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(botonicPath, 'src', 'webchat.template.html'),
        filename: 'index.html',
      }),
      imageminPlugin,
      new webpack.EnvironmentPlugin({
        HUBTYPE_API_URL: null,
        WEBCHAT_PUSHER_KEY: null,
        BOTONIC_TARGET: 'webchat',
      }),
    ],
  }
}

function botonicWebviewsConfig(mode) {
  return {
    optimization: {
      minimize: true,
      minimizer: [terserPlugin],
    },
    mode: mode,
    devtool: sourceMap(mode),
    target: 'web',
    entry: path.resolve('webpack-entries', 'webviews-entry.js'),
    output: {
      path: path.resolve(path.join(__dirname, 'dist', 'webviews')),
      filename: 'webviews.js',
      library: 'BotonicWebview',
      libraryTarget: 'umd',
      libraryExport: 'app',
    },
    module: {
      rules: [
        babelLoaderConfig,
        babelLoaderConfig2,
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: '../assets',
              },
            },
          ],
        },
        stylesLoaderConfig,
      ],
    },
    resolve: resolveConfig,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(botonicPath, 'src', 'webview.template.html'),
        filename: 'index.html',
      }),
      imageminPlugin,
      new webpack.EnvironmentPlugin({
        HUBTYPE_API_URL: null,
        BOTONIC_TARGET: 'webviews',
      }),
    ],
  }
}

function botonicServerConfig(mode) {
  return {
    optimization: {
      minimize: true,
      minimizer: [terserPlugin],
    },
    context: root,
    mode: mode,
    devtool: sourceMap(mode),
    target: 'node',
    entry: path.resolve('webpack-entries', 'node-entry.js'),
    output: {
      filename: 'bot.js',
      library: 'bot',
      libraryTarget: 'umd',
      libraryExport: 'app',
      path: path.resolve('./dist'),
    },
    module: {
      rules: [
        babelLoaderConfig,
        babelLoaderConfig2,
        fileLoaderConfig,
        nullLoaderConfig,
      ],
    },
    resolve: resolveConfig,
    plugins: [
      new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['dist'] }),
      imageminPlugin,
      new webpack.EnvironmentPlugin({
        HUBTYPE_API_URL: null,
        BOTONIC_TARGET: 'node',
      }),
      new CopyPlugin({
        patterns: [{ from: 'nlu/models/', to: 'assets/models/' }],
      }),
    ],
  }
}

module.exports = function (env, argv) {
  if (env.target === 'all') {
    return [
      botonicServerConfig(argv.mode),
      botonicWebviewsConfig(argv.mode),
      botonicWebchatConfig(argv.mode),
    ]
  } else if (env.target === BOTONIC_TARGETS.DEV) {
    return [botonicDevConfig(argv.mode)]
  } else if (env.target === BOTONIC_TARGETS.NODE) {
    return [botonicServerConfig(argv.mode)]
  } else if (env.target === BOTONIC_TARGETS.WEBVIEWS) {
    return [botonicWebviewsConfig(argv.mode)]
  } else if (env.target === BOTONIC_TARGETS.WEBCHAT) {
    return [botonicWebchatConfig(argv.mode)]
  } else {
    return null
  }
}
