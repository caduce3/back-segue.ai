import { FastifyInstance } from "fastify";
import { cadastrarTransaction } from "../_transaction/cadastrar-transaction";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verificarPasta } from "@/http/middlewares/verificar-pasta";
import { pegarTransactions } from "../_transaction/pegar-transactions";
import { deletarTransaction } from "../_transaction/deletar-transaction";
import { atualizarTransaction } from "../_transaction/atualizar-transaction";
import { pegarUnicaTransaction } from "../_transaction/pegar-unica-transaction";
import { somarValorTotalTipoTransaction } from "../_transaction/somar-valor-total-tipo-transaction";
import { gastosPorCategoriaTransaction } from "../_transaction/gastos-por-categoria-transaction";

export async function transactionRoutes(app: FastifyInstance) {
  app.post(
    "/cadastrar_transaction",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS"])] },
    cadastrarTransaction
  );

  app.post(
    "/pegar_transactions",
    {
      onRequest: [verifyJwt, verificarPasta(["FINANCAS", "PAROQUIA", "PADRE"])],
    },
    pegarTransactions
  );

  app.post(
    "/deletar_transaction",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS"])] },
    deletarTransaction
  );

  app.put(
    "/atualizar_transaction",
    { onRequest: [verifyJwt, verificarPasta(["FINANCAS"])] },
    atualizarTransaction
  );

  app.post(
    "/pegar_unica_transaction",
    {
      onRequest: [verifyJwt, verificarPasta(["FINANCAS", "PAROQUIA", "PADRE"])],
    },
    pegarUnicaTransaction
  );

  app.post(
    "/somar_valor_total_tipo_transaction",
    { onRequest: [verifyJwt] },
    somarValorTotalTipoTransaction
  );

  app.post(
    "/gastos_por_categoria",
    {
      onRequest: [verifyJwt],
    },
    gastosPorCategoriaTransaction
  );
}
