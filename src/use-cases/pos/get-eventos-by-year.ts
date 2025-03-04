import { IgrejaRepository } from "@/repositories/igreja-repository";
import { PosRepository } from "@/repositories/pos-repository";
import { Evento } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";

interface GetEventosByYearRequest {
  year: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface GetEventosByYearResponse {
  eventosList: Evento[];
}

export class GetEventosByYearsUseCase {
  constructor(
    private posRepository: PosRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    year,
    igrejaId,
    idUserEquipeDirigente,
  }: GetEventosByYearRequest): Promise<GetEventosByYearResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const eventos = await this.posRepository.getEventosByYear(year, igrejaId);

    if (!eventos || eventos.length === 0) {
      return {
        eventosList: [],
      };
    }

    return {
      eventosList: eventos,
    };
  }
}
