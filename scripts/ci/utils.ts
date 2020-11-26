import * as spawn from 'await-spawn'
import { prompt } from 'inquirer'
import { green, red } from 'colors'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export enum Versions {
  ALPHA = 'alpha',
  RC = 'rc',
  FINAL = 'final',
}

export const BLACKLIST = ['node_modules', 'scripts']

export const fromEntries = (xs: [string | number | symbol, any][]) =>
  xs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

export const readJSON = (jsonPath: string): any =>
  JSON.parse(readFileSync(jsonPath, { encoding: 'utf-8' as BufferEncoding }))

export const writeJSON = (jsonPath: string, object: any): void =>
  writeFileSync(jsonPath, JSON.stringify(object, null, 2) + '\n')

export const spawnProcess = async (
  command: string,
  args: string[] = [],
  log?: { onSuccess: () => void }
): Promise<void> => {
  try {
    await spawn(command, args)
    log?.onSuccess()
  } catch (e) {
    console.log(
      red(`   Failed on running commmand ${command} ${args.join(' ')}\n`)
    )
  }
}

export const getPackageJSON = packagePath =>
  readJSON(join(packagePath, 'package.json'))

export const changeBotonicDeps = async (packagePath, withVersion) => {
  console.log(' - Replacing botonic dependencies...')
  try {
    const packageJSON = getPackageJSON(packagePath)
    const newDependencies = fromEntries(
      Object.entries(packageJSON.dependencies).map(([k, v]) =>
        k.includes('@botonic') ? [k, withVersion] : [k, v]
      )
    )
    packageJSON.dependencies = newDependencies
    writeJSON(join(packagePath, 'package.json'), packageJSON)
    console.log(green('   Replaced botonic deps successfully.\n'))
  } catch (e) {
    console.log(red('   Failed at replacing botonic deps.'))
  }
}

export const doAskToVersionToUpdate = async (): Promise<string> => {
  const { version } = await prompt([
    {
      type: 'list',
      name: 'version',
      message: 'To what version do you want to update?',
      choices: [Versions.ALPHA, Versions.RC, Versions.FINAL],
    },
  ])
  return version
}
