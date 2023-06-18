import * as fs from 'fs'
import path from 'path'
import packageJson from '../package.json'

function rewritePath(path: string) {
  return path.replace('/publish', '')
}
const newPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  files: packageJson.files,
  main: rewritePath(packageJson.main),
  module: rewritePath(packageJson.module),
  types: rewritePath(packageJson.types)
}

const outputPath = path.resolve(__dirname, '../publish/package.json')
fs.writeFileSync(outputPath, JSON.stringify(newPackageJson, null, 2))