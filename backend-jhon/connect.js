import { MongoClient } from 'mongodb'

export const URI = process.env.MONGODB_URI

if (!URI) {
  throw new Error('A variável de ambiente MONGODB_URI não está definida.')
}

const client = new MongoClient(URI, {
  ssl: true, // Enable SSL/TLS
  tlsAllowInvalidCertificates: false, // Do not allow invalid certificates
  tlsAllowInvalidHostnames: false, // Ensure hostname validation
  connectTimeoutMS: 30000, // Increase connection timeout
  socketTimeoutMS: 30000, // Increase socket timeout
})

export const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log('Conexão bem-sucedida ao MongoDB')
    return client.db('formDBAE') 
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    throw error 
  }
}
