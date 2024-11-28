import { FastifyInstance } from "fastify";

import { cadastrarUserEquipeDirigente } from "../_equipe-dirigente/cadastrar-user-equipe-dirigente";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { pegarUsersEquipeDirigente } from "../_equipe-dirigente/pegar-users-equipe-dirigente";
import { deletarUserEquipeDirigente } from "../_equipe-dirigente/deletar-user-equipe-dirigente";

export async function equipeDirigenteRoutes(app: FastifyInstance) {
  app.post(
    "/cadastrar_equipe_dirigente",
    { onRequest: [verifyJwt, verificarPasta(["PAROQUIA", "PADRE"])] },
    cadastrarUserEquipeDirigente
  );

  app.post(
    "/pegar_equipe_dirigente",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS", "PAROQUIA", "PADRE"])] },
    pegarUsersEquipeDirigente
  );

  app.post(
    "/deletar_user_equipe_dirigente",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS", "PAROQUIA", "PADRE"])] },
    deletarUserEquipeDirigente
  );
}
