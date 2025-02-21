import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { routes } from './routes'

dotenv.config()

const PORT = process.env.PORT || 3333

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
