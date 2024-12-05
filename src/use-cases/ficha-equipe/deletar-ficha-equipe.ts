import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { FichaEquipeRepository } from "@/repositories/ficha-equipe-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaEquipeNaoExiste } from "../@errors/ficha-equipe/erro-deletar-ficha-equipe";

interface DeletarFichaEquipeRequest {
  id: string;
  idUserEquipeDirigente: string;
  igrejaId: string;
}

interface DeletarFichaEquipeResponse {
  boolean: boolean;
}

export class DeletarFichaEquipeUseCase {
  constructor(
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private igrejaRepository: IgrejaRepository,
    private fichaEquipeRepository: FichaEquipeRepository
  ) {}

  async execute({
    id,
    idUserEquipeDirigente,
    igrejaId,
  }: DeletarFichaEquipeRequest): Promise<DeletarFichaEquipeResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const fichaEquipeExiste =
      await this.fichaEquipeRepository.findFichaEquipeById(id);
    if (!fichaEquipeExiste) throw new FichaEquipeNaoExiste();

    await this.fichaEquipeRepository.deletarFichaEquipeById(id);

    return {
      boolean: true,
    };
  }
}
