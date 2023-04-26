import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import inlineImage from 'esbuild-plugin-inline-image'

const nodeEntryPoint = './esbuild-entries/node-entry.js'
const outputFile = './dist/bot.js'

const outputDir = path.dirname(outputFile)
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

const nodeBundle: esbuild.BuildOptions = {
  entryPoints: [nodeEntryPoint],
  platform: 'node',
  outfile: outputFile,
  bundle: true,
  minify: false,
  sourcemap: true,
  format: 'cjs',
  external: ['esbuild'],
  loader: {
    '.js': 'jsx',
  },
  assetNames: 'assets/[name]',
  plugins: [inlineImage(), sassPlugin()],
}

const webpackBundle: esbuild.BuildOptions = {
  entryPoints: [nodeEntryPoint],
  platform: 'browser',
  outfile: outputFile,
  bundle: true,
  minify: false,
  sourcemap: true,
  format: 'esm',
  external: ['esbuild'],
  loader: {
    '.js': 'jsx',
  },
  assetNames: 'assets/[name]',
  plugins: [inlineImage(), sassPlugin()],
}

// Bundle the application using esbuild
esbuild.build(nodeBundle).catch(() => process.exit(1))
