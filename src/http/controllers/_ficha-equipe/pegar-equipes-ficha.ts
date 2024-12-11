import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { ErroAoCarregarEquipesFicha } from "@/use-cases/@errors/ficha-equipe/erro-carregar-equipes-ficha";
import { makePegarEquipesFichaUseCase } from "@/use-cases/@factories/ficha-equipe.ts/make-pegar-equipes-ficha-use-case";

export async function pegarEquipesFicha(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarEquipesFichaBodySchema = z.object({
    page: z.number().positive(),
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    fichaId: z.string().uuid(),
  });

  const { page, igrejaId, idUserEquipeDirigente, fichaId } =
    pegarEquipesFichaBodySchema.parse(request.body);

  try {
    const pegarEquipesFichaUseCase = makePegarEquipesFichaUseCase();

    const { equipesFichaList, totalItens, totalPages } =
      await pegarEquipesFichaUseCase.execute({
        page,
        igrejaId,
        idUserEquipeDirigente,
        fichaId,
      });

    return reply.status(200).send({
      totalItens,
      totalPages,
      currentPage: page,
      equipesFichaList,
    });
  } catch (error) {
    if (
      error instanceof ErroAoCarregarEquipesFicha ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
