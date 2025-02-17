import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './connect.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

let db
connectToDatabase()
  .then((database) => {
    db = database 
  })
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error)
    process.exit(1)
  })

app.get('/', async (req, res) => {
  try {
    const formCollection = await db.collection('form').find({}).toArray()
    res.send(formCollection)
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
  }
})

app.post('/', async (req, res) => {
  try {
    const { name, email, entidade } = req.body

    if (!name || !email || !entidade) {
      return res
        .status(400)
        .send({
          error: 'Todos os campos são obrigatórios: name, email, entidade',
        })
    }

    const newFormEntry = {
      name,
      email,
      entidade,
      createdAt: new Date(),
    }

    const result = await db.collection('form').insertOne(newFormEntry)

    res
      .status(201)
      .send({
        message: 'Dados salvos com sucesso',
        data: { ...newFormEntry, _id: result.insertedId },
      })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando 🚀 na porta ${PORT}`)
})
