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
    "/create_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA"])] },
    cadastrarPalestra
  );

  app.put(
    "/update_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA"])] },
    atualizarPalestra
  );

  app.get(
    "/get_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA", "PADRE", "PAROQUIA"])] },
    pegarUnicoPalestra
  );

  app.get(
    "/get_palestras",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA", "PADRE", "PAROQUIA"])] },
    pegarPalestras
  );

  app.delete(
    "/delete_palestra",
    { onRequest: [verifyJwt, verificarPasta(["PALESTRA"])] },
    deletarPalestra
  );
}
