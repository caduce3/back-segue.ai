import { IgrejaRepository } from "@/repositories/igreja-repository";
import { PosRepository } from "@/repositories/pos-repository";
import { Evento } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";

interface CadastrarEventoRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  nome: string;
  descricao?: string;
  horario: string;
  data: string;
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
    horario,
    data,
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
      horario,
      data: new Date(data),
      userIdCreatedAt: idUserEquipeDirigente,
      userIdUpdatedAt: idUserEquipeDirigente,
      igreja: {
        connect: {
          id: igrejaId,
        },
      },
    });

    return {
      evento,
    };
  }
}
