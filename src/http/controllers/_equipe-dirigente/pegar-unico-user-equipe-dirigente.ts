import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ErroAoCarregarPagina } from "@/use-cases/@errors/erro-carregar-pagina";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makePegarUnicoUserEquipeDirigenteUseCase } from "@/use-cases/@factories/equipe-dirigente/make-pegar-unico-user-equipe-dirigente-use-case";
import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";

export async function pegarUnicoUserEquipeDirigente(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const pegarUnicoUserEquipeDirigenteBodySchema = z.object({
    id: z.string(),
    igrejaId: z.string(),
    idUserEquipeDirigente: z.string(),
  });

  const { id, igrejaId, idUserEquipeDirigente } =
    pegarUnicoUserEquipeDirigenteBodySchema.parse(request.body);

  try {
    const pegarUnicoUserEquipeDirigenteUseCase =
      makePegarUnicoUserEquipeDirigenteUseCase();

    const userEquipeDirigente =
      await pegarUnicoUserEquipeDirigenteUseCase.execute({
        id,
        igrejaId,
        idUserEquipeDirigente,
      });

    // Organizando a resposta
    const { userEquipeDirigente: equipeDirigente } = userEquipeDirigente;

    return reply.status(200).send({
      id: equipeDirigente.id,
      nome: equipeDirigente.nome,
      email: equipeDirigente.email,
      telefone: equipeDirigente.telefone,
      ano: equipeDirigente.ano,
      igrejaId: equipeDirigente.igrejaId,
      status: equipeDirigente.status,
      createdAt: equipeDirigente.createdAt,
      updatedAt: equipeDirigente.updatedAt,
      pasta: equipeDirigente.pasta,
    });
  } catch (error) {
    if (
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroAoCarregarPagina ||
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
