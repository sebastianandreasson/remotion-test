import express from 'express'
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { rmSync } from 'fs'

const app = express()
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const audioPath = `${__dirname}/audio/nvidia.m4a`
const outPath = `${__dirname}/audio/slice.m4a`

app.get('/audio-slice', (req, res) => {
  let { start, end } = req.query

  exec(
    `ffmpeg -i ${audioPath} -ss ${start} -to ${end} -c copy ${outPath}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error slicing audio')
        return
      }
      console.log(stdout)

      res.sendFile(outPath, () => {
        rmSync(outPath)
      })
    }
  )
})

app.listen(3000, () => console.log('running on port 3000'))
