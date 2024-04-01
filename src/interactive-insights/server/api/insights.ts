import path from 'path'
import fs from 'node:fs'

export default defineEventHandler(async (event) => {
  const folder = path.join(process.cwd(), 'server/insights')
  const insights = fs
    .readdirSync(folder)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(`${folder}/${f}`, 'utf-8')))
  return insights
})
