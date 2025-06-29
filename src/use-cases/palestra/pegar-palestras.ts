import { IgrejaRepository } from "@/repositories/igreja-repository";
import { Palestra } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroAoCarregarPalestras } from "../@errors/palestra/erro-carregar-palestra";
import { PalestraRepository } from "@/repositories/palestra-repository";

interface PegarPalestraRequest {
  page: number;
  igrejaId: string;
  idUserEquipeDirigente: string;
  nomePalestrante?: string;
  temaPalestra?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface PegarPalestraResponse {
  palestrasList: Palestra[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarPalestrasUseCase {
  constructor(
    private palestraRepository: PalestraRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    page,
    igrejaId,
    idUserEquipeDirigente,
    nomePalestrante,
    temaPalestra,
    dataInicio,
    dataFim,
  }: PegarPalestraRequest): Promise<PegarPalestraResponse> {
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
      throw new Error("Data inicial inválida");
    }
    if (dataFimDate && isNaN(dataFimDate.getTime())) {
      if (isNaN(dataFimDate.getTime())) {
        throw new Error("Data final inválida");
      }
    }

    const { palestras, totalCount } =
      await this.palestraRepository.pegarPalestras(
        take,
        page,
        igrejaId,
        nomePalestrante,
        temaPalestra,
        dataInicioDate,
        dataFimDate
      );

    if (!palestras || palestras.length === 0) {
      return {
        palestrasList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: 0,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarPalestras();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      palestrasList: palestras,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
