import { readFileSync } from 'fs'

export const readInput = (path: string) => {
  return readFileSync(path, { encoding: 'utf8' })
}

export const isCharNumber = (char: string) => {
  return !Number.isNaN(Number.parseInt(char))
}
