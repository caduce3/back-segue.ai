import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "../@errors/transaction/erro-deletar-transaction-sua-igreja";
import { ErroAoDeletarPalestra } from "../@errors/palestra/erro-deletar-palestra";
import { ErroPalestraNaoExiste } from "../@errors/palestra/erro-palestra-nao-existe";
import { PalestraRepository } from "@/repositories/palestra-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";

interface DeletarPalestraRequest {
  id: string;
  idUserEquipeDirigente: string;
}

interface DeletarPalestraResponse {
  boolean: boolean;
}

export class DeletarPalestraUseCase {
  constructor(
    private palestraRepository: PalestraRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    idUserEquipeDirigente,
  }: DeletarPalestraRequest): Promise<DeletarPalestraResponse> {
    const palestraExiste = await this.palestraRepository.findPalestraById(id);
    if (!palestraExiste) throw new ErroPalestraNaoExiste();

    const equiqueDirigenteExiste =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(
        idUserEquipeDirigente
      );
    if (!equiqueDirigenteExiste) throw new ErroEquipeDirigenteNaoExiste();

    //verificar se o usuario que esta deletando pertence a essa igreja que a transaction esta cadastrada
    if (palestraExiste.igrejaId !== equiqueDirigenteExiste.igrejaId)
      throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

    const deletarPalestra = await this.palestraRepository.deletarPalestra(id);
    if (!deletarPalestra) throw new ErroAoDeletarPalestra();

    return {
      boolean: true,
    };
  }
}
