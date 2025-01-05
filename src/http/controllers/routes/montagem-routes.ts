import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { pegarFichas } from "../_ficha/pegar-fichas";

export async function montagemRoutes(app: FastifyInstance) {
  app.post(
    "/pegar_fichas_montagem",
    {
      onRequest: [verifyJwt, verificarPasta(["MONTAGEM", "PADRE", "PAROQUIA"])],
    },
    pegarFichas
  );
}
