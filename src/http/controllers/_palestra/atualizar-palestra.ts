import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroAtualizarPalestra } from "@/use-cases/@errors/palestra/erro-atualizar-palestra";
import { ErroPalestraNaoExiste } from "@/use-cases/@errors/palestra/erro-palestra-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeAtualizarPalestraUseCase } from "@/use-cases/@factories/palestra/make-editar-palestra-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function atualizarPalestra(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const atualizarPalestraBodySchema = z.object({
    id: z.string().uuid(),
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    nomePalestrante: z.string().optional(),
    temaPalestra: z.string().optional(),
    descricaoPalestra: z.string().optional(),
    duracaoPalestra: z.number().optional(),
    dataPalestra: z.string().optional(),
    notaPalestra: z.number().optional(),
    observacoes: z.string().optional(),
  });

  const {
    id,
    igrejaId,
    idUserEquipeDirigente,
    nomePalestrante,
    temaPalestra,
    descricaoPalestra,
    duracaoPalestra,
    dataPalestra,
    notaPalestra,
    observacoes,
  } = atualizarPalestraBodySchema.parse(request.body);

  try {
    const atualizarPalestraUseCase = makeAtualizarPalestraUseCase();

    await atualizarPalestraUseCase.execute({
      id,
      igrejaId,
      idUserEquipeDirigente,
      nomePalestrante,
      temaPalestra,
      descricaoPalestra,
      duracaoPalestra,
      dataPalestra,
      notaPalestra,
      observacoes,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroAtualizarPalestra ||
      error instanceof ErroPalestraNaoExiste ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send({
    message: "Palestra atualizada com sucesso!",
  });
}
