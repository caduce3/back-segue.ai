import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makePegarUnicoPalestraUseCase } from "@/use-cases/@factories/palestra/make-pegar-palestra-use-case";
import { ErroPalestraNaoExiste } from "@/use-cases/@errors/palestra/erro-palestra-nao-existe";

export async function pegarUnicoPalestra(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const pegarUnicaPalestraQuerySchema = z.object({
    id: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, igrejaId, idUserEquipeDirigente } =
    pegarUnicaPalestraQuerySchema.parse(request.query);

  try {
    const pegarUnicaPalestraUseCase = makePegarUnicoPalestraUseCase();

    const palestra = await pegarUnicaPalestraUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
    });

    return reply.status(200).send(palestra);
  } catch (error) {
    if (
      error instanceof ErroPalestraNaoExiste ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
