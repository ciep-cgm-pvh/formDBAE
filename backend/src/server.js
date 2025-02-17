import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './connect.js'
import { ObjectId } from 'mongodb'

const app = express()
const PORT = 3000

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'], 
}

app.use(cors(corsOptions))
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
      return res.status(400).send({
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

    res.status(201).send({
      message: 'Dados salvos com sucesso',
      data: { ...newFormEntry, _id: result.insertedId },
    })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      console.log('ID inválido:', id)
      return res.status(400).send({ error: 'ID inválido' })
    }

    const objectId = new ObjectId(id)

    console.log('Filtro usado para exclusão:', { _id: objectId })
    const result = await db.collection('form').deleteOne({ _id: objectId })

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Documento não encontrado' })
    }

    res.send({ message: 'Documento excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir documento:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando 🚀 na porta ${PORT}`)
})
