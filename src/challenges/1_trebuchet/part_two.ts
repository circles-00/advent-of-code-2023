import { join } from 'path'
import { readInput } from '../../utils'

const $1_trebuchet_part_two = () => {
  const input = readInput(join(__dirname, './input.txt'))
  const inputLines = input.split('\n')

  const numbersMap: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  } as const

  const getNumberFromWord = (word: string): number | undefined => {
    for (let numberWord of Object.keys(numbersMap)) {
      if (word.startsWith(numberWord)) {
        return numbersMap[numberWord]
      }
    }
  }

  return inputLines.reduce((acc: number, curr: string) => {
    const number = curr
      ?.split('')
      ?.map((char: string, idx) => {
        if (!Number.isNaN(Number.parseInt(char))) {
          return char
        }

        const numberFromWord = getNumberFromWord(curr?.slice(idx))

        if (!!numberFromWord) {
          return numberFromWord
        }
      })
      .filter(Boolean)
      .join('')

    if (number.length < 1) {
      return acc
    }

    const twoDigitNumber = Number.parseInt(
      `${number.charAt(0)}${number.charAt(number.length - 1)}`,
    )

    return acc + twoDigitNumber
  }, 0)
}

export default $1_trebuchet_part_two
