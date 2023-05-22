// Para toda criação de uma API, preciso de um servidor HTTP
// É o endereço onde o Front vai fazer as requisições HTTP(GET, POST, PUSH, DELETE)
// Essas requisições vão bater no servidor, que vai interpretar essas requisições e vai bater uma resposta pra elas
// Para o servidor ouvir essas requisições preciso do método listen(), que é uma promisse, então uso o then()

// HTTP Method: GET, POST, PUT, PATCH, DELETE

// API RESTful
import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();
app.register(multipart);

app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(cors, {
  origin: true,
  // todas as urls de front poderão acessar nosso back-end
  // CORRIGIR QUANDO FOR PRA PRODUÇÃO COLOCAR LINK ESPECÍFICO
  // origin: ['www.spacetime.com']
});

app.register(jwt, {
  secret: "spacetime",
});
// secret é uma maneira de diferenciar os tokens (jwl gerados) por este back-end de outros jwt's gerados por outros back-ends.
// o token será assinado pelo valor de secret

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on htpp://localhost:3333");
  });
