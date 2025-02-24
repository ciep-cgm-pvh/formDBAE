import express from 'express'
import cors from 'cors'
import formRoutes from './routes/form-routes'
import { connectToDatabase } from './database/connect'

const PORT = 3333
const app = express()


const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(express.json())

connectToDatabase()
  .then((database) => {
    app.use('/form', formRoutes(database))

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Falha ao conectar ao banco de dados:', error)
    process.exit(1) 
  })
