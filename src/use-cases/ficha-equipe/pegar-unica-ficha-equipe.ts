import { IgrejaRepository } from "@/repositories/igreja-repository";
import { FichaEquipe } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaEquipeRepository } from "@/repositories/ficha-equipe-repository";
import { FichaEquipeNaoExiste } from "../@errors/ficha-equipe/erro-deletar-ficha-equipe";

interface PegarUnicaFichaEquipeRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicaFichaEquipeResponse {
  fichaEquipe: FichaEquipe;
}

export class PegarUnicaFichaEquipeUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private fichaEquipeRepository: FichaEquipeRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicaFichaEquipeRequest): Promise<PegarUnicaFichaEquipeResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const fichaEquipe =
      await this.fichaEquipeRepository.findFichaEquipeById(id);
    if (!fichaEquipe) throw new FichaEquipeNaoExiste();

    return {
      fichaEquipe,
    };
  }
}
