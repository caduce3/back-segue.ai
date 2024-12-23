import {
  AvaliacaoEquipe,
  Equipes,
  FichaEquipe,
  FuncaoEquipe,
  TipoEcontro,
} from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaEquipeRepository } from "@/repositories/ficha-equipe-repository";
import { FichaNaoExiste } from "../@errors/ficha/erro-ficha-nao-existe";
import { ErroAoAtualizarFichaEquipe } from "../@errors/ficha-equipe/erro-atualizar-ficha-equipe";

interface AtualizarFichaEquipeRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  id: string;
  equipe?: Equipes;
  ano?: string;
  funcao?: FuncaoEquipe;
  avaliacao?: AvaliacaoEquipe;
  observacoes?: string;
  tipoEncontro?: TipoEcontro;
}

interface AtualizarFichaEquipeResponse {
  fichaEquipe: FichaEquipe;
}

export class AtualizarFichaEquipeUseCase {
  constructor(
    private fichaEquipeRepository: FichaEquipeRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    igrejaId,
    idUserEquipeDirigente,
    id,
    equipe,
    ano,
    funcao,
    avaliacao,
    observacoes,
    tipoEncontro
  }: AtualizarFichaEquipeRequest): Promise<AtualizarFichaEquipeResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const encontrarFichaEquipe =
      await this.fichaEquipeRepository.findFichaEquipeById(id);
    if (!encontrarFichaEquipe) throw new FichaNaoExiste();

    const fichaEquipe = await this.fichaEquipeRepository.atualizarFichaEquipe(
      id,
      {
        equipe,
        ano,
        funcao,
        avaliacao,
        observacoes,
        tipoEncontro
      }
    );

    if (!fichaEquipe) throw new ErroAoAtualizarFichaEquipe();

    return {
      fichaEquipe: fichaEquipe,
    };
  }
}
