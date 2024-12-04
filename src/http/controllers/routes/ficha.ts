import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { cadastrarFicha } from "../_ficha/cadastrar-ficha";
import { deletarFicha } from "../_ficha/deletar-ficha";
import { atualizarFicha } from "../_ficha/atualizar-ficha";

export async function fichaRoutes(app: FastifyInstance) {
  app.post(
    "/cadastrar_ficha",
    { onRequest: [verifyJwt, verificarPasta(["FICHAS"])] },
    cadastrarFicha
  );

  app.post(
    "/deletar_ficha",
    { onRequest: [verifyJwt, verificarPasta(["FICHAS"])] },
    deletarFicha
  );

  app.put(
    "/atualizar_ficha",
    { onRequest: [verifyJwt, verificarPasta(["FICHAS"])] },
    atualizarFicha
  );

}
