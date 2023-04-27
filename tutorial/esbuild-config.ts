import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import inlineImage from 'esbuild-plugin-inline-image'
import imageminPlugin from 'esbuild-plugin-imagemin'
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html')

const nodeEntryPoint = './esbuild-entries/node-entry.js'
const nodeOutputFile = './dist/bot.js'

const nodeOutputDir = path.dirname(nodeOutputFile)
if (!fs.existsSync(nodeOutputDir)) {
  fs.mkdirSync(nodeOutputDir, { recursive: true })
}

const nodeBundle: esbuild.BuildOptions = {
  entryPoints: [nodeEntryPoint],
  platform: 'node',
  outfile: nodeOutputFile,
  bundle: true,
  minify: false,
  sourcemap: true,
  format: 'cjs',
  external: ['esbuild'],
  loader: {
    '.js': 'jsx',
  },
  assetNames: 'assets/[name]-[hash]',
  plugins: [inlineImage(), sassPlugin()],
}

const webchatEntryPoint = './esbuild-entries/webchat-entry.js'
const webchatOutputFile = './dist/webchat.botonic.js'

const webchatOutputDir = path.dirname(webchatOutputFile)
if (!fs.existsSync(webchatOutputDir)) {
  fs.mkdirSync(webchatOutputDir, { recursive: true })
}

const webchatBundle: esbuild.BuildOptions = {
  entryPoints: [webchatEntryPoint],
  platform: 'browser',
  outfile: webchatOutputFile,
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'iife',
  globalName: 'Botonic',
  external: ['esbuild'],
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
  },
  define: { global: 'window' },
  assetNames: 'assets/[name]-[hash]',
  plugins: [imageminPlugin(), inlineImage(), sassPlugin({ type: 'style' })],
}

const webviewsEntryPoint = './esbuild-entries/webviews-entry.js'
const webviewsOutputFile = './dist/webviews/webviews.js'

const webviewsOutputDir = path.dirname(webviewsOutputFile)
if (!fs.existsSync(webviewsOutputDir)) {
  fs.mkdirSync(webviewsOutputDir, { recursive: true })
}

const BOTONIC_PATH = path.resolve(
  __dirname,
  'node_modules',
  '@botonic',
  'react'
)
const TEMPLATES = {
  WEBCHAT: 'webchat.template.html',
  WEBVIEWS: 'webview.template.html',
}
const WEBVIEW_TEMPLATE_PATH = path.resolve(
  BOTONIC_PATH,
  'src',
  TEMPLATES.WEBVIEWS
)

const webviewsBundle: esbuild.BuildOptions = {
  entryPoints: [{ in: webviewsEntryPoint, out: 'webviews' }],
  platform: 'browser',
  outdir: './dist/webviews',
  bundle: true,
  minify: true,
  keepNames: true,
  minifyWhitespace: true,
  minifyIdentifiers: false,
  sourcemap: false,
  format: 'iife',
  globalName: 'BotonicWebview',
  external: ['esbuild'],
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
  },
  metafile: true,
  define: { global: 'window' },
  assetNames: '../assets/[name]-[hash]',
  plugins: [
    imageminPlugin(),
    inlineImage(),
    sassPlugin({ type: 'style' }),
    htmlPlugin({
      files: [
        {
          entryPoints: [WEBVIEW_TEMPLATE_PATH],
          filename: 'index.html',
          htmlTemplate: `
          <html>
          <head>
            <title></title>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <style>
              html,
              body,
              #root {
                width: 100%;
                height: 100%;
                margin: 0px;
                padding: 0px;
              }
            </style>
            <script defer="defer" src="webviews.js"></script>
          </head>
          <body>
            <script>
              ;(function (d, s, id) {
                var js,
                  fjs = d.getElementsByTagName(s)[0]
                if (d.getElementById(id)) {
                  return
                }
                js = d.createElement(s)
                js.id = id
                js.src = 'https://connect.facebook.net/en_US/messenger.Extensions.js'
                fjs.parentNode.insertBefore(js, fjs)
              })(document, 'script', 'Messenger')
            </script>
            <div id="root"></div>
            <script>
              document.addEventListener('DOMContentLoaded', function (event) {
                BotonicWebview.render(document.getElementById('root'))
              })
            </script>
          </body>
        </html>                    
          `,
        },
      ],
    }),
  ],
}

esbuild.build(nodeBundle).catch(() => process.exit(1))
esbuild.build(webchatBundle).catch(() => process.exit(1))
esbuild.build(webviewsBundle).catch(e => {
  console.log(e)
  process.exit(1)
})
