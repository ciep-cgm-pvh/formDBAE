import cors from "cors";
import express from "express";
import serverless from "serverless-http";

// Cria uma instância do Express
const app = express();

// Habilita CORS para aceitar todas as origens (*)
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));

// Define a rota padrão GET que retorna "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Exporta a função handler para ser usada pelo Vercel
export const handler = serverless(app);

// Inicia o servidor localmente (apenas para desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

