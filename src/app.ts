import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { igrejaRoutes } from "./http/controllers/routes/igreja-routes";
import { transactionRoutes } from "./http/controllers/routes/transaction-routes";
import { equipeDirigenteRoutes } from "./http/controllers/routes/equipe-dirigente-routes";
import { fichaRoutes } from "./http/controllers/routes/ficha";
import { montagemRoutes } from "./http/controllers/routes/montagem-routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: [env.URL_PRODUCTION_FRONT, env.URL_TESTE_FRONT], // Permite apenas essa origem
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Permite o envio de cookies
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);
app.register(igrejaRoutes);
app.register(transactionRoutes);
app.register(equipeDirigenteRoutes);
app.register(fichaRoutes);
app.register(montagemRoutes);
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV != "production") {
    console.error(error);
  } else {
    //
  }

  return reply.status(500).send({ message: "Internal server error" });
});
