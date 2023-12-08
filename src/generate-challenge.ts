import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const getChallengeContent = (challengeName: string) =>
  `import { join } from 'path'
import { readInput } from '../../utils'

const $${challengeName} = () => {
  const input = readInput(join(__dirname, './input.txt'))
  const inputLines = input.split('\n')
}

export default $${challengeName}
`

export const generateChallenge = (challengeName: string) => {
  mkdirSync(join(__dirname, './challenges', challengeName))
  writeFileSync(
    join(__dirname, './challenges', challengeName, 'part_one.ts'),
    getChallengeContent(`${challengeName}_part_one`),
  )
  writeFileSync(
    join(__dirname, './challenges', challengeName, 'part_two.ts'),
    getChallengeContent(`${challengeName}_part_two`),
  )

  writeFileSync(join(__dirname, './challenges', challengeName, 'input.txt'), '')
}

const [challengeName] = process.argv.slice(2)
generateChallenge(challengeName)
