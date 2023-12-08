import { readdirSync } from 'fs'
import { join } from 'path'

const [challenge] = process.argv.slice(2)

const allFiles = readdirSync(join(__dirname, './challenges'))
const files = allFiles.filter((file) => {
  if (!challenge) {
    return true
  }

  return file.startsWith(`${challenge}_`)
})

files.forEach(async (file) => {
  const timeLabel = `Execution time`
  const { default: challenge_part_one } = await import(
    join(__dirname, './challenges', file, 'part_one.ts')
  )

  const { default: challenge_part_two } = await import(
    join(__dirname, './challenges', file, 'part_two.ts')
  )

  console.log('---------------------------------')

  console.time(timeLabel)
  console.log(`Result for ${file}_part_one:`, '\x1b[32m', challenge_part_one())
  console.timeEnd(timeLabel)

  console.log('---------------------------------')

  console.log('---------------------------------')

  console.time(timeLabel)
  console.log(`Result for ${file}_part_two:`, '\x1b[37m', challenge_part_two())
  console.timeEnd(timeLabel)

  console.log('---------------------------------')
})
