import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import inlineImage from 'esbuild-plugin-inline-image'
import imageminPlugin from 'esbuild-plugin-imagemin'

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
  },
  define: { global: 'window' },
  assetNames: 'assets/[name]-[hash]',
  plugins: [imageminPlugin(), inlineImage(), sassPlugin({ type: 'style' })],
}

const webviewsEntryPoint = './esbuild-entries/webviews-entry.js'
const webviewsOutputFile = './dist/webviews/webviews.botonic.js'

const webviewsOutputDir = path.dirname(webviewsOutputFile)
if (!fs.existsSync(webviewsOutputDir)) {
  fs.mkdirSync(webviewsOutputDir, { recursive: true })
}

const webviewsBundle: esbuild.BuildOptions = {
  entryPoints: [webviewsEntryPoint],
  platform: 'browser',
  outfile: webviewsOutputFile,
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'iife',
  globalName: 'BotonicWebview',
  external: ['esbuild'],
  loader: {
    '.js': 'jsx',
  },
  define: { global: 'window' },
  assetNames: '../assets/[name]-[hash]',
  plugins: [imageminPlugin(), inlineImage(), sassPlugin({ type: 'style' })],
}

// Bundle the application using esbuild
esbuild.build(nodeBundle).catch(() => process.exit(1))
esbuild.build(webchatBundle).catch(() => process.exit(1))
esbuild.build(webviewsBundle).catch(() => process.exit(1))
