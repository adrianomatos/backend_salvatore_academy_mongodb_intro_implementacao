// CRIA APLICAÇÃO USANDO EXPRESS
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// Informações de acesso ao BANCO DE DADOS
const dbUrl =
  "mongodb+srv://admin:A57kAkg6eykAb9@cluster0.bn1bc7s.mongodb.net/";
const dbName = "mongodb_intro_implementacao";

// Função principal MAIN
async function main() {
  // Conexão ao Banco de Dados
  const client = new MongoClient(dbUrl);
  console.log("Conectando ao Banco de Dados...");
  await client.connect();
  console.log("Banco de Dados conectado com sucesso!");
  const db = client.db(dbName);
  const collection = db.collection("personagem");

  const app = express();

  // ---------- ---------- ENDPOINT PRINCIPAL
  app.get("/", function (req, res) {
    res.send("Hello World Nodemon!");
  });

  // LISTA
  // const lista = ["Java", "Android", "Kotlin", "JavaScript"];

  // ---------- ---------- ENDPOINT READ ALL
  app.get("/personagens", async function (req, res) {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  // ---------- ---------- ENDPOINT READ BY ID
  app.get("/personagens/:id", async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return res.status(404).send("ALERTA: Ítem não encontrado");
    }
    res.send(item);
  });

  // Sinalisando que express está usando JSON
  app.use(express.json());

  // ---------- ---------- ENDPOINT CREATE COM POST
  // /personagens
  app.post("/personagens", async function (req, res) {
    const novoItem = req.body;
    if (!novoItem || !novoItem.nome) {
      return res.status(400).send("ALERTA: Falta propriedade NOME");
    }
    // if (lista.includes(novoItem)) {
    //   return res.status(409).send("ALERTA: Ítem JÁ EXISTE");
    // }
    await collection.insertOne(novoItem);
    res.status(201).send(novoItem);
  });

  // ---------- ---------- ENDPOINT UPDATE COM PUT
  // /personagens/id
  app.put("/personagens/:id", async function (req, res) {
    const id = req.params.id;
    // if (!lista[id - 1]) {
    //   return res.status(404).send("ALERTA: Ítem não encontrado");
    // }
    const novoItem = req.body;

    if (!novoItem || !novoItem.nome) {
      return res.status(400).send("ALERTA: Falta propriedade NOME");
    }
    // if (lista.includes(novoItem)) {
    //   return res.status(409).send("ALERTA: Ítem JÁ EXISTE");
    // }
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: novoItem });
    res.send(novoItem);
  });

  // ---------- ---------- ENDPOINT DELETE
  // /personagens/id
  app.delete("/personagens/:id", function (req, res) {
    const id = req.params.id;
    if (!lista[id - 1]) {
      return res.status(404).send("ALERTA: Ítem não encontrado");
    }
    delete lista[id - 1];
    res.send("Ítem removido com sucesso: " + id);
  });

  // SERVIDOR OUVINDO
  app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
  );
}

// Executando função principal main
main();
