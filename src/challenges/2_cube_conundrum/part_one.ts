import { join } from 'path'
import { readInput } from '../../utils'

const $2_cube_conundrum_part_one = () => {
  const input = readInput(join(__dirname, './input.txt'))
  const inputLines = input.split('\n')?.filter(Boolean)
  const bagContents = {
    red: 12,
    green: 13,
    blue: 14,
  }

  const parsedInput = inputLines
    .map((line) => {
      const [game, sets] = line.split(':')
      const [, gameId] = game.split(' ')

      const parsedSets = sets.split(';').map((set) => {
        const cubes = set.split(',')

        const red = cubes.find((cube) => cube.includes('red'))?.trim()
        const green = cubes.find((cube) => cube.includes('green'))?.trim()
        const blue = cubes.find((cube) => cube.includes('blue'))?.trim()

        return {
          red: red ? Number.parseInt(red?.split(' ')[0] ?? '') : 0,
          green: green ? Number.parseInt(green?.split(' ')[0] ?? '') : 0,
          blue: blue ? Number.parseInt(blue?.split(' ')[0] ?? '') : 0,
        }
      })

      return {
        gameId: Number.parseInt(gameId),
        sets: parsedSets,
      }
    })
    .filter(({ sets }) => {
      return sets.every(
        ({ red, green, blue }) =>
          red <= bagContents.red &&
          green <= bagContents.green &&
          blue <= bagContents.blue,
      )
    })

  return parsedInput.reduce((acc, { gameId }) => acc + gameId, 0)
}

export default $2_cube_conundrum_part_one
