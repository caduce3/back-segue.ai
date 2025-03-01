import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroCadastrarPalestra } from "@/use-cases/@errors/palestra/erro-cadastrar-palestra";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeCadastrarPalestraUseCase } from "@/use-cases/@factories/palestra/make-cadastrar-palestra-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarPalestra(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarPalestraBodySchema = z.object({
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    nomePalestrante: z.string(),
    temaPalestra: z.string(),
    descricaoPalestra: z.string(),
    duracaoPalestra: z.number(),
    dataPalestra: z.string(),
    notaPalestra: z.number(),
    observacoes: z.string().optional(),
  });

  const {
    igrejaId,
    idUserEquipeDirigente,
    nomePalestrante,
    temaPalestra,
    descricaoPalestra,
    duracaoPalestra,
    dataPalestra,
    notaPalestra,
    observacoes,
  } = cadastrarPalestraBodySchema.parse(request.body);

  try {
    const cadastrarPalestraUseCase = makeCadastrarPalestraUseCase();

    await cadastrarPalestraUseCase.execute({
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
      error instanceof ErroCadastrarPalestra ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Palestra cadastrada com sucesso!",
  });
}
