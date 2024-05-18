// CRIA APLICAÇÃO USANDO EXPRESS
const express = require("express");
const app = express();

//  ENDPOINT PRINCIPAL
app.get("/", function (req, res) {
  res.send("Hello World Nodemon!");
});

// LISTA
const lista = ["Java", "Android", "Kotlin", "JavaScript"];

// ENDPOINT Read All
app.get("/personagens", function (req, res) {
  res.send(lista.filter(Boolean));
});

// ENDPOINT Read By ID
app.get("/personagens/:id", function (req, res) {
  const id = req.params.id;
  const item = lista[id - 1];
  if (!item) {
    return res.status(404).send("ALERTA: Ítem não encontrado");
  }
  res.send(item);
});

// Sinalisando que express está usando JSON
app.use(express.json());

// ENDPOINT Create POST /personagens
app.post("/personagens", function (req, res) {
  const body = req.body;
  const novoItem = body.nome;
  if (!novoItem) {
    return res.status(400).send("ALERTA: Falta propriedade NOME");
  }
  if (lista.includes(novoItem)) {
    return res.status(409).send("ALERTA: Ítem JÁ EXISTE");
  }
  lista.push(novoItem);
  res.status(201).send("Ítem adicionado com sucesso: " + novoItem);
});

// ENDPOINT Update PUT /personagens/id
app.put("/personagens/:id", function (req, res) {
  const id = req.params.id; // Acessando o parâmetro ID da rota
  if (!lista[id - 1]) {
    return res.status(404).send("ALERTA: Ítem não encontrado");
  }
  const body = req.body; // Acessando o BODY da requisição
  const novoItem = body.nome; // Acessando propriedade nome do body
  if (!novoItem) {
    return res.status(400).send("ALERTA: Falta propriedade NOME");
  }
  if (lista.includes(novoItem)) {
    return res.status(409).send("ALERTA: Ítem JÁ EXISTE");
  }
  lista[id - 1] = novoItem; // Atualisamos na lista pelo ID - 1
  res.send("Ítem alterado com sucesso: " + id + " - " + novoItem);
});

// ENDPOINT DELETE /personagens/id
app.delete("/personagens/:id", function (req, res) {
  const id = req.params.id; // Acessando o parâmetro ID da rota
  if (!lista[id - 1]) {
    return res.status(404).send("ALERTA: Ítem não encontrado");
  }
  delete lista[id - 1]; // Deleta pelo ID - 1
  res.send("Ítem removido com sucesso: " + id);
});

// SERVIDOR OUVINDO
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
