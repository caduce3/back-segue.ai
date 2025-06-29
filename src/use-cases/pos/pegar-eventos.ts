import { IgrejaRepository } from "@/repositories/igreja-repository";
import { PosRepository } from "@/repositories/pos-repository";
import { Evento } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroAoCarregarEventos } from "../@errors/pos/erro-carregar-evento";

interface PegarEventoRequest {
  page: number;
  igrejaId: string;
  idUserEquipeDirigente: string;
  nome?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface PegarEventoResponse {
  eventosList: Evento[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarEventosUseCase {
  constructor(
    private posRepository: PosRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    page,
    igrejaId,
    idUserEquipeDirigente,
    nome,
    dataInicio,
    dataFim,
  }: PegarEventoRequest): Promise<PegarEventoResponse> {
    if (page <= 0) page = 1;
    const take = 10;

    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const dataInicioDate = dataInicio
      ? new Date(dataInicio.split("/").reverse().join("-"))
      : undefined;
    const dataFimDate = dataFim
      ? new Date(dataFim.split("/").reverse().join("-"))
      : undefined;

    // Verifique se a data é válida
    if (dataInicioDate && isNaN(dataInicioDate.getTime())) {
      throw new Error("Data de início inválida");
    }
    if (dataFimDate && isNaN(dataFimDate.getTime())) {
      throw new Error("Data de fim inválida");
    }

    const { eventos, totalCount } = await this.posRepository.pegarEventos(
      take,
      page,
      igrejaId,
      nome,
      dataInicioDate,
      dataFimDate
    );

    if (!eventos || eventos.length === 0) {
      return {
        eventosList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: 0,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarEventos();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      eventosList: eventos,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
