import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from '../connect.js'
import { ObjectId } from 'mongodb'

const PORT = 3333
const app = express()

// Configurações do CORS
const corsOptions = {
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'DELETE'],
}

app.use(cors(corsOptions))
app.use(express.json())

let db

// Conectar ao banco de dados antes de iniciar o servidor
connectToDatabase()
  .then((database) => {
    db = database

    // Iniciar o servidor apenas após a conexão bem-sucedida
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Falha ao conectar ao banco de dados:', error)
    process.exit(1) // Encerrar o processo em caso de falha
  })

// Rota GET
app.get('/form/', async (req, res) => {
  try {
    const formCollection = await db.collection('form').find({}).toArray()
    res.send(formCollection)
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    res.status(500).send({ error: 'Erro interno do servidor' })
  }
})

// Rota POST
app.post('/form/', async (req, res) => {
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

// Rota DELETE
app.delete('/form/:id', async (req, res) => {
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
