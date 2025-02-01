import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroCadastrarEvento } from "@/use-cases/@errors/pos/erro-cadastrar-evento";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";
import { makeCadastrarEventoUseCase } from "@/use-cases/@factories/pos/make-cadastrar-evento-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function cadastrarEvento(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const cadastrarEventoBodySchema = z.object({
    igrejaId: z.string().uuid(),
    idUserEquipeDirigente: z.string().uuid(),
    nome: z.string(),
    descricao: z.string().optional(),
    data: z.string(),
    horario: z.string(),
  });

  const { igrejaId, idUserEquipeDirigente, nome, descricao, data, horario } =
    cadastrarEventoBodySchema.parse(request.body);

  try {
    const cadastrarEventoUseCase = makeCadastrarEventoUseCase();

    await cadastrarEventoUseCase.execute({
      igrejaId,
      idUserEquipeDirigente,
      nome,
      descricao,
      data,
      horario,
    });
  } catch (error) {
    if (
      error instanceof IgrejaNaoExiste ||
      error instanceof ErroEquipeDirigenteNaoExiste ||
      error instanceof ErroCadastrarEvento ||
      error instanceof ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send({
    message: "Evento cadastrado com sucesso!",
  });
}
