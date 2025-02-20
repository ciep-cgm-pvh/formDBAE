import cors from "cors";
import express from "express";
import serverless from "serverless-http";

// Cria uma instância do Express
const app = express();

// Habilita CORS para aceitar todas as origens (*)
/*const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"], 
};
app.use(cors(corsOptions));*/
app.use((req, res, next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});
const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

// Define a rota padrão GET que retorna "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Exporta a função handler para ser usada pelo Vercel
const handler = serverless(app);

// Inicia o servidor localmente (apenas para desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default handler;