import { ErroTransactionNaoExiste } from "../@errors/transaction/erro-transaction-nao-existe";
import { ErroAoDeletarTransaction } from "../@errors/transaction/erro-deletar-transaction";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "../@errors/transaction/erro-deletar-transaction-sua-igreja";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { FichaRepository } from "@/repositories/ficha-repository";
import { FichaNaoExiste } from "../@errors/ficha/erro-ficha-nao-existe";
import { FichaEquipeRepository } from "@/repositories/ficha-equipe-repository";

interface DeletarFichaRequest {
  id: string;
  idUserEquipeDirigente: string;
}

interface DeletarFichaResponse {
  boolean: boolean;
}

export class DeletarFichaUseCase {
  constructor(
    private fichaRepository: FichaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private fichaEquipeRepository: FichaEquipeRepository
  ) {}

  async execute({
    id,
    idUserEquipeDirigente,
  }: DeletarFichaRequest): Promise<DeletarFichaResponse> {
    const fichaExiste = await this.fichaRepository.findFichaById(id);
    if (!fichaExiste) throw new FichaNaoExiste();

    const equiqueDirigenteExiste =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(
        idUserEquipeDirigente
      );
    if (!equiqueDirigenteExiste) throw new ErroEquipeDirigenteNaoExiste();

    //verificar se o usuario que esta deletando pertence a essa igreja que a ficha esta cadastrada
    if (fichaExiste.igrejaId !== equiqueDirigenteExiste.igrejaId)
      throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

    //verificar se existem equipes relacionadas com a ficha para deletar antes de deletar a ficha
    const fichasEquipe =
      await this.fichaEquipeRepository.findFichaEquipeByFichaId(id);
    if (fichasEquipe) {
      fichasEquipe.map(async (fichaEquipe) => {
        await this.fichaEquipeRepository.deletarFichaEquipeById(fichaEquipe.id);
      });
    }

    await this.fichaRepository.deletarFicha(id);

    return {
      boolean: true,
    };
  }
}
