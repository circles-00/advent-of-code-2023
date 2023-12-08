import { join } from 'path'
import { isCharNumber, readInput } from '../../utils'

interface INumber {
  positions: number[]
  value: number
  line: number
}

interface ITemporaryNumber extends Omit<INumber, 'value'> {
  value: string
}

const isSymbol = (char: string) => {
  return (
    !!char &&
    !isCharNumber(char) &&
    char !== '.' &&
    char !== ' ' &&
    char !== '\n'
  )
}

const isPartNumber = (
  inputLines: string[],
  line: number,
  positions: number[],
) => {
  // Check adjacent in same line
  if (
    isSymbol(
      inputLines[line].charAt(positions[positions.length - 1] + 1).trim(),
    ) ||
    isSymbol(inputLines[line].charAt(positions[0] - 1).trim())
  ) {
    return true
  }

  // Check above
  if (line > 0) {
    const isAbovePartNumber = inputLines[line - 1]
      .split('')
      .some(
        (char, idx) =>
          isSymbol(char) &&
          [
            positions[0] - 1,
            ...positions,
            positions[positions.length - 1] + 1,
          ].includes(idx),
      )

    if (isAbovePartNumber) {
      return true
    }
  }

  // Check below
  if (line + 1 < inputLines.length - 1) {
    return inputLines[line + 1]
      .split('')
      .some(
        (char, idx) =>
          isSymbol(char) &&
          [
            positions[0] - 1,
            ...positions,
            positions[positions.length - 1] + 1,
          ].includes(idx),
      )
  }

  return false
}

const $3_gear_ratios_part_one = () => {
  const input = readInput(join(__dirname, './input.txt'))
  const inputLines = input.split('\n')

  const numbers: INumber[] = []

  inputLines.forEach((line, lineNumber) => {
    let number: ITemporaryNumber = {
      positions: [],
      line: 0,
      value: '',
    }

    const lineChars = line.split('')
    lineChars.forEach((char, idx) => {
      if (isCharNumber(char)) {
        number.value += char
        number.positions.push(idx)
        number.line = lineNumber
      }

      if (!!number.value && !isCharNumber(lineChars[idx + 1])) {
        numbers.push({
          positions: number.positions,
          value: Number.parseInt(number.value),
          line: number.line,
        })
        number = {
          positions: [],
          value: '',
          line: 0,
        }
      }
    })
  })

  return numbers
    .filter(({ positions, line }) => isPartNumber(inputLines, line, positions))
    .reduce((acc, { value }) => acc + value, 0)
}

export default $3_gear_ratios_part_one
