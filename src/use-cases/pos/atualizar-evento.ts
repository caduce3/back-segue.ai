import { IgrejaRepository } from "@/repositories/igreja-repository";
import { PosRepository } from "@/repositories/pos-repository";
import { Evento } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroEventoNaoExiste } from "../@errors/pos/erro-evento-nao-existe";
import { ErroAtualizarEvento } from "../@errors/pos/erro-atualizar-evento";

interface AtualizarEventoRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
  nome?: string;
  descricao?: string;
  horarioInicio?: string;
  horarioFim?: string;
  data?: string;
  avaliacao?: number;
}

interface AtualizarEventoResponse {
  evento: Evento;
}

export class AtualizarEventoUseCase {
  constructor(
    private posRepository: PosRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
    nome,
    descricao,
    horarioInicio,
    horarioFim,
    data,
    avaliacao,
  }: AtualizarEventoRequest): Promise<AtualizarEventoResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const eventoExiste = await this.posRepository.findEventoById(id);
    if (!eventoExiste) throw new ErroEventoNaoExiste();

    const evento = await this.posRepository.atualizarEvento(id, {
      nome,
      descricao,
      horarioInicio,
      horarioFim,
      data: data ? new Date(data) : undefined,
      avaliacao,
      userIdUpdatedAt: idUserEquipeDirigente,
    });

    if (!evento) throw new ErroAtualizarEvento();

    return {
      evento,
    };
  }
}
