import { type Db, MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI
if (!URI) {
  throw new Error('A variável de ambiente MONGODB_URI não está definida.')
}

const client = new MongoClient(URI)

export const connectToDatabase = async (): Promise<Db> => {
  try {
    await client.connect()
    return client.db('formDBAE')
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    throw error
  }
}
