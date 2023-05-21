// Para toda criação de uma API, preciso de um servidor HTTP
// É o endereço onde o Front vai fazer as requisições HTTP(GET, POST, PUSH, DELETE)
// Essas requisições vão bater no servidor, que vai interpretar essas requisições e vai bater uma resposta pra elas
// Para o servidor ouvir essas requisições preciso do método listen(), que é uma promisse, então uso o then()

// HTTP Method: GET, POST, PUT, PATCH, DELETE

// API RESTful

import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoutes } from "./routes/memories";

const app = fastify();

app.register(cors, {
  origin: true,
  // todas as urls de front poderão acessar nosso back-end
  // CORRIGIR QUANDO FOR PRA PRODUÇÃO COLOCAR LINK ESPECÍFICO
  // origin: ['www.spacetime.com']
});
app.register(memoriesRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP server running on htpp://localhost:3333");
  });
