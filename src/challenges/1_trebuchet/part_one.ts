import { join } from 'path'
import { readInput } from '../../utils'

const $1_trebuchet_part_one = () => {
  const input = readInput(join(__dirname, './input.txt'))
  const inputLines = input.split('\n')

  return inputLines.reduce((acc: number, curr: string) => {
    const number = curr
      .split('')
      .filter((item) => !Number.isNaN(+item))
      .join('')

    // No numbers in the string
    if (number.length < 1) {
      return acc
    }

    const twoDigitNumber = Number.parseInt(
      `${number.charAt(0)}${number.charAt(number.length - 1)}`,
    )

    return acc + twoDigitNumber
  }, 0)
}

export default $1_trebuchet_part_one
