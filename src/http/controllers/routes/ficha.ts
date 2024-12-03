import { FastifyInstance } from "fastify";

import { cadastrarUserEquipeDirigente } from "../_equipe-dirigente/cadastrar-user-equipe-dirigente";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";

export async function fichaRoutes(app: FastifyInstance) {
  app.post(
    "/cadastrar_ficha",
    { onRequest: [verifyJwt, verificarPasta(["FICHAS"])] },
    cadastrarUserEquipeDirigente
  );

}
