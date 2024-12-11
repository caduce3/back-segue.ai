import { IgrejaRepository } from "@/repositories/igreja-repository";
import { FichaEquipe } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaEquipeRepository } from "@/repositories/ficha-equipe-repository";
import { ErroAoCarregarEquipesFicha } from "../@errors/ficha-equipe/erro-carregar-equipes-ficha";

interface PegarEquipesFichaRequest {
  page: number;
  igrejaId: string;
  idUserEquipeDirigente: string;
  fichaId: string;
}

interface PegarEquipesFichaResponse {
  equipesFichaList: FichaEquipe[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarEquipesFichaUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private fichaEquipeRepository: FichaEquipeRepository
  ) {}

  async execute({
    page,
    igrejaId,
    idUserEquipeDirigente,
    fichaId,
  }: PegarEquipesFichaRequest): Promise<PegarEquipesFichaResponse> {
    if (page <= 0) page = 1;
    const take = 10;

    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const { equipesFicha, totalCount } =
      await this.fichaEquipeRepository.pegarEquipesFicha(take, page, fichaId);

    if (!equipesFicha || equipesFicha.length === 0) {
      return {
        equipesFichaList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: 0,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarEquipesFicha();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      equipesFichaList: equipesFicha,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
