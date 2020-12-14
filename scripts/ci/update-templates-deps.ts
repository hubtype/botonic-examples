import { join } from 'path'
import { chdir } from 'process'
import { blue } from 'colors'
import { lstatSync, readdirSync } from 'fs'
import {
  BLACKLIST,
  changeBotonicDeps,
  doAskToVersionToUpdate,
  Versions,
} from './utils'

process.chdir('..')

let versionNumber = process.argv[2]

const examplesPath = process.cwd()
const examplesList = readdirSync(examplesPath)
  .filter(dir => !dir.startsWith('.'))
  .filter(dir => lstatSync(dir).isDirectory())
  .filter(dir => !BLACKLIST.includes(dir))
;(async () => {
  const version = await doAskToVersionToUpdate()
  if (version === Versions.FINAL) versionNumber = `~${versionNumber}`
  console.log(blue(`Updating examples to ${versionNumber} version:`))
  for (const example of examplesList) {
    const examplePath = join(examplesPath, example)
    chdir(examplePath)
    console.log(`Updating deps for ${example} example...`)
    console.log('====================================')
    changeBotonicDeps(examplePath, versionNumber)
  }
})()
