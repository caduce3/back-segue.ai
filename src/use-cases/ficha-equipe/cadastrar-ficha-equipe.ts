import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import {
  AvaliacaoEquipe,
  Equipes,
  FichaEquipe,
  FuncaoEquipe,
} from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaEquipeRepository } from "@/repositories/ficha-equipe-repository";
import { FichaNaoExiste } from "../@errors/ficha/erro-ficha-nao-existe";
import { FichaRepository } from "@/repositories/ficha-repository";
import { ErroAoCriarFichaEquipe } from "../@errors/ficha-equipe/erro-criar-ficha-equipe";

interface CadastrarFichaEquipeRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  fichaId: string;
  equipe: Equipes;
  ano: string;
  funcao: FuncaoEquipe;
  avaliacao: AvaliacaoEquipe;
  observacoes?: string;
}

interface CadastrarFichaEquipeResponse {
  fichaEquipe: FichaEquipe;
}

export class CadastrarFichaEquipeUseCase {
  constructor(
    private fichaEquipeRepository: FichaEquipeRepository,
    private fichaRepository: FichaRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    igrejaId,
    idUserEquipeDirigente,
    fichaId,
    equipe,
    ano,
    funcao,
    avaliacao,
    observacoes,
  }: CadastrarFichaEquipeRequest): Promise<CadastrarFichaEquipeResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const encontrarFicha = await this.fichaRepository.findFichaById(fichaId);
    if (!encontrarFicha) throw new FichaNaoExiste();

    const fichaEquipe = await this.fichaEquipeRepository.cadastrarFichaEquipe(
      fichaId,
      {
        equipe,
        ano,
        funcao,
        avaliacao,
        observacoes,
        ficha: {
          connect: {
            id: fichaId,
          },
        },
      }
    );

    if (!fichaEquipe) throw new ErroAoCriarFichaEquipe();

    return {
      fichaEquipe: fichaEquipe,
    };
  }
}
