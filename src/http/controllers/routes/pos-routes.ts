import { FastifyInstance } from "fastify";
import { cadastrarEvento } from "../_pos/cadastrar-evento";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { atualizarEvento } from "../_pos/atualizar-evento";
import { pegarUnicoEvento } from "../_pos/pegar-evento";
import { pegarEventos } from "../_pos/pegar-eventos";
import { deletarEvento } from "../_pos/deletar-evento";

export async function posRoutes(app: FastifyInstance) {
  app.post(
    "/create_evento",
    { onRequest: [verifyJwt, verificarPasta(["POS"])] },
    cadastrarEvento
  );

  app.put(
    "/update_evento",
    { onRequest: [verifyJwt, verificarPasta(["POS"])] },
    atualizarEvento
  );

  app.get(
    "/get_evento",
    { onRequest: [verifyJwt, verificarPasta(["POS", "PADRE", "PAROQUIA"])] },
    pegarUnicoEvento
  );

  app.get(
    "/get_eventos",
    { onRequest: [verifyJwt, verificarPasta(["POS", "PADRE", "PAROQUIA"])] },
    pegarEventos
  );

  app.delete(
    "/delete_evento",
    { onRequest: [verifyJwt, verificarPasta(["POS"])] },
    deletarEvento
  );
}
