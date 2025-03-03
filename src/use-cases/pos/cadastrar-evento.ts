import { IgrejaRepository } from "@/repositories/igreja-repository";
import { PosRepository } from "@/repositories/pos-repository";
import { Evento } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroCadastrarEvento } from "../@errors/pos/erro-cadastrar-evento";

interface CadastrarEventoRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  nome: string;
  descricao: string;
  horarioInicio: string;
  horarioFim: string;
  data: string;
  avaliacao: number;
}

interface CadastrarEventoResponse {
  evento: Evento;
}

export class CadastrarEventoUseCase {
  constructor(
    private posRepository: PosRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    igrejaId,
    idUserEquipeDirigente,
    nome,
    descricao,
    horarioInicio,
    horarioFim,
    data,
    avaliacao,
  }: CadastrarEventoRequest): Promise<CadastrarEventoResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const evento = await this.posRepository.cadastrarEvento({
      nome,
      descricao,
      horarioInicio,
      horarioFim,
      data: new Date(data),
      avaliacao,
      userIdCreatedAt: idUserEquipeDirigente,
      userIdUpdatedAt: idUserEquipeDirigente,
      igreja: {
        connect: {
          id: igrejaId,
        },
      },
    });

    if (!evento) {
      throw new ErroCadastrarEvento();
    }

    return {
      evento,
    };
  }
}
