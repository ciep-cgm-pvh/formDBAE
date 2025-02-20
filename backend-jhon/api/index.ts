import 'dotenv/config';
const express = require("express");
const cors= require('cors');
const { connectToDatabase } = require("../connect.js");
const app = express();

app.use(express.static('public'));

// Habilita CORS para aceitar todas as origens (*)
app.use(cors());

// Define a rota padrão GET que retorna "Hello World"
app.get('/', (req, res) => {
   console.log("defualt route")
  res.send('Hello World');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  console.log("in middleware")
  // Environment variables
  const PORT = process.env.PORT || 3000;
  
  /// Connect to the database before starting the server
(async () => {
    console.log("Before connection");
  
    try {
      console.log("Start connection");
      const db = await connectToDatabase(); // Wait for the database connection
      console.log('Database connected successfully.');
  
      // Start the server only after a successful database connection
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      process.exit(1); // Exit the process if the database connection fails
    }
  
    console.log("After connection");
  })();

module.exports = app;