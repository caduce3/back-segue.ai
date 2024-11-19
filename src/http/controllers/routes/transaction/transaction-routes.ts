import { FastifyInstance } from "fastify";
import { cadastrarTransaction } from "../../_transaction/cadastrar-transaction";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { pegarTransactions } from "../../_transaction/pegar-transactions";

export async function transactionRoutes(app: FastifyInstance) {
  app.post(
    "/cadastrar_transaction",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS"])] },
    cadastrarTransaction
  );

  app.post(
    "/pegar_transactions",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS", "PAROQUIA"])] },
    pegarTransactions
  );
}
