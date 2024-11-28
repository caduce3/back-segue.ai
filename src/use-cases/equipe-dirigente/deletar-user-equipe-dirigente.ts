import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "../@errors/transaction/erro-deletar-transaction-sua-igreja";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroAoDeletarUserEquipeDirigente } from "../@errors/equipeDirigente/erro-deletar-user-equipe-dirigente";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { IgrejaRepository } from "@/repositories/igreja-repository";

interface DeletarUserEquipeDirigenteRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface DeletarUserEquipeDirigenteResponse {
  boolean: boolean;
}

export class DeletarUserEquipeDirigenteUseCase {
  constructor(
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private igrejaRepository: IgrejaRepository
  ) {}

  async execute({
    igrejaId,
    idUserEquipeDirigente,
  }: DeletarUserEquipeDirigenteRequest): Promise<DeletarUserEquipeDirigenteResponse> {

    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const equiqueDirigenteExiste =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(
        idUserEquipeDirigente
      );
    if (!equiqueDirigenteExiste) throw new ErroEquipeDirigenteNaoExiste();

    //verificar se o usuario que esta deletando pertence a essa igreja
    console.log(igrejaId, equiqueDirigenteExiste.igrejaId)
    if (igrejaId !== equiqueDirigenteExiste.igrejaId)
      throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

    const deletarUserEquipeDirigente =
      await this.equipeDirigenteRepository.deletarUserEquipeDirigente(
        idUserEquipeDirigente
      );
    if (!deletarUserEquipeDirigente)
      throw new ErroAoDeletarUserEquipeDirigente();

    return {
      boolean: true,
    };
  }
}
