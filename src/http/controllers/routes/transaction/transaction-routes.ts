import { FastifyInstance } from "fastify";
import { cadastrarTransaction } from "../../transaction/cadastrar-transaction";

export async function transactionRoutes(app: FastifyInstance) {
  app.post("/cadastrar_transaction", cadastrarTransaction);
}
