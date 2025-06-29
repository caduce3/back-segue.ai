import { IgrejaRepository } from "@/repositories/igreja-repository";
import { CoresCirculos, Equipes, Ficha } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaRepository } from "@/repositories/ficha-repository";
import { ErroAoCarregarFichas } from "../@errors/ficha/erro-carregar-fichas";

interface PegarFichasMontagemRequest {
  page: number;
  igrejaId: string;
  idUserEquipeDirigente: string;
  equipeAtual: Equipes;
  nomePastaFichas?: string;
  nomeJovem?: string;
  anoEncontro?: string;
  corCirculoOrigem?: CoresCirculos;
}

interface PegarFichasMontagemResponse {
  fichasList: Ficha[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarFichasMontagemUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private fichaRepository: FichaRepository
  ) {}

  async execute({
    page,
    igrejaId,
    idUserEquipeDirigente,
    equipeAtual,
    nomePastaFichas,
    nomeJovem,
    anoEncontro,
    corCirculoOrigem,
  }: PegarFichasMontagemRequest): Promise<PegarFichasMontagemResponse> {
    if (page <= 0) page = 1;
    const take = 22;

    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const { fichas, totalCount } =
      await this.fichaRepository.pegarFichasMontagem(
        take,
        page,
        igrejaId,
        equipeAtual,
        nomePastaFichas,
        nomeJovem,
        anoEncontro,
        corCirculoOrigem
      );

    if (!fichas || fichas.length === 0) {
      return {
        fichasList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: 0,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarFichas();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      fichasList: fichas,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
