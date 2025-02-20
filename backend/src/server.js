import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './connect.js'
import { ObjectId } from 'mongodb'

const app = express()

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
}
app.use(cors(corsOptions))
app.use(express.json())

let db
export const handler = async (req, res) => {
  if (!db) {
    try {
      db = await connectToDatabase()
    } catch (error) {
      console.error('Falha ao conectar ao MongoDB:', error)
      return res
        .status(500)
        .send({ error: 'Erro ao conectar ao banco de dados' })
    }
  }
  
  if (req.method === 'GET') {
    try {
      const formCollection = await db.collection('form').find({}).toArray()
      return res.send(formCollection)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      return res.status(500).send({ error: 'Erro interno do servidor' })
    }
  }

  if (req.method === 'POST') {
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
      return res.status(201).send({
        message: 'Dados salvos com sucesso',
        data: { ...newFormEntry, _id: result.insertedId },
      })
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
      return res.status(500).send({ error: 'Erro interno do servidor' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query
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
      return res.send({ message: 'Documento excluído com sucesso' })
    } catch (error) {
      console.error('Erro ao excluir documento:', error)
      return res.status(500).send({ error: 'Erro interno do servidor' })
    }
  }

  return res.status(405).send({ error: 'Método não permitido' })
}

export default handler
