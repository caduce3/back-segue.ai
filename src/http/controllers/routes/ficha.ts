import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { cadastrarFicha } from "../_ficha/cadastrar-ficha";
import { deletarFicha } from "../_ficha/deletar-ficha";
import { atualizarFicha } from "../_ficha/atualizar-ficha";
import { pegarFichas } from "../_ficha/pegar-fichas";
import { pegarUnicaFicha } from "../_ficha/pegar-unica-ficha";
import { cadastrarFichaEquipe } from "../_ficha-equipe/cadastrar-ficha-equipe";
import { deletarFichaEquipe } from "../_ficha-equipe/deletar-ficha-equipe";

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

  app.post(
    "/pegar_fichas",
    {
      onRequest: [
        verifyJwt,
        verificarPasta(["FICHAS", "PADRE", "PAROQUIA", "MONTAGEM"]),
      ],
    },
    pegarFichas
  );

  app.post(
    "/pegar_unica_ficha",
    {
      onRequest: [
        verifyJwt,
        verificarPasta(["FICHAS", "PADRE", "PAROQUIA", "MONTAGEM"]),
      ],
    },
    pegarUnicaFicha
  );

  app.post(
    "/cadastrar_equipe_ficha",
    {
      onRequest: [verifyJwt, verificarPasta(["FICHAS"])],
    },
    cadastrarFichaEquipe
  );

  app.post(
    "/deletar_equipe_ficha",
    {
      onRequest: [verifyJwt, verificarPasta(["FICHAS"])],
    },
    deletarFichaEquipe
  );
}
