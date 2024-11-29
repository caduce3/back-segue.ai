import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makePegarUsersEquipeDirigenteUseCase } from "@/use-cases/@factories/equipe-dirigente/make-pegar-users-equipe-dirigente-use-case";
import { ErroAoCarregarUsersEquipeDirigente } from "@/use-cases/@errors/equipeDirigente/erro-carregar-users-equipe-dirigente";
import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";

export async function pegarUsersEquipeDirigente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarUsersEquipeDirigenteBodySchema = z.object({
    page: z.number().positive(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { page, igrejaId, idUserEquipeDirigente } =
    pegarUsersEquipeDirigenteBodySchema.parse(request.body);

  try {
    const pegarUsersEquipeDirigenteUseCase =
      makePegarUsersEquipeDirigenteUseCase();

    const { equipeDirigenteList, totalItens, totalPages } =
      await pegarUsersEquipeDirigenteUseCase.execute({
        page,
        igrejaId,
        idUserEquipeDirigente,
      });

    return reply.status(200).send({
      totalItens,
      totalPages,
      currentPage: page,
      equipeDirigenteList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarUsersEquipeDirigente ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja ||
      error instanceof ErroEquipeDirigenteNaoExiste
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
