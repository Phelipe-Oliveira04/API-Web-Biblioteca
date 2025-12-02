import express from "express";
import { AppDataSource } from "./data-source";
import livroRoutes from "./routes/livroRoutes";

const app = express();
app.use(express.json());

app.use("/api/livros", livroRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado (SQLite)");
    app.listen(3000, () => {
      console.log("API rodando em http://localhost:3000");
    });
  })
  .catch((error) => console.error("Erro ao conectar no banco:", error));
