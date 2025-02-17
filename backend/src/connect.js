import { MongoClient } from 'mongodb'

const URI =
  'mongodb+srv://cgmtipvh:ydaZOTLaS2tBTmRR@formdbae.ioaql.mongodb.net/?retryWrites=true&w=majority&appName=formDBAE'
const client = new MongoClient(URI)

export const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log('Conectado ao MongoDB')
    return client.db('formDBAE') // Retorna a instância do banco de dados
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    throw error
  }
}