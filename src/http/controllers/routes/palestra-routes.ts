import { FastifyInstance } from "fastify";
import { cadastrarPalestra } from "../_palestra/cadastrar-palestra";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { atualizarPalestra } from "../_palestra/atualizar-palestra";
import { pegarUnicoPalestra } from "../_palestra/pegar-palestra";
import { pegarPalestras } from "../_palestra/pegar-palestras";
import { deletarPalestra } from "../_palestra/deletar-palestra";

export async function palestraRoutes(app: FastifyInstance) {
  app.post(
    "/cadastrar_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA"])] },
    cadastrarPalestra
  );

  app.put(
    "/atualizar_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA"])] },
    atualizarPalestra
  );

  app.get(
    "/pegar_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA", "PADRE", "PAROQUIA"])] },
    pegarUnicoPalestra
  );

  app.get(
    "/pegar_palestras",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA", "PADRE", "PAROQUIA"])] },
    pegarPalestras
  );

  app.delete(
    "/deletar_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA"])] },
    deletarPalestra
  );
}
