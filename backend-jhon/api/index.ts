const express = require("express");
const app = express();

app.use(express.static('public'));

// Habilita CORS para aceitar todas as origens (*)
app.use(cors());

// Define a rota padrão GET que retorna "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;