import { MongoClient } from 'mongodb'

export const connectionString = process.env.MONGODB_URI


if (!connectionString) {
  throw new Error('A variável de ambiente MONGODB_URI não está definida.')
}

const client = new MongoClient(connectionString, {
  ssl: true, // Enable SSL/TLS
  tlsAllowInvalidCertificates: false, // Do not allow invalid certificates
  tlsAllowInvalidHostnames: false, // Ensure hostname validation
  connectTimeoutMS: 30000, // Increase connection timeout
  socketTimeoutMS: 30000, // Increase socket timeout
})

/**
 * Connects to the MongoDB database and returns the database instance.
 * @returns {Promise<Db>} A promise that resolves to the MongoDB database instance.
 */
export const connectToDatabase = async () => {
  try {
    console.log('Iniciando conexão com o MongoDB...');
    
    // Attempt to connect to the MongoDB server
    await client.connect();
    console.log('Conexão bem-sucedida ao MongoDB.');

    // Select the database
    const db = client.db('formDBAE'); // Replace 'formDBAE' with your database name
    console.log(`Banco de dados selecionado: ${db.databaseName}`);

    return db; // Return the database instance
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);

    // Rethrow the error to ensure the server handles the failure
    throw error;
  }
};