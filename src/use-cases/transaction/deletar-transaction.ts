import { TransactionRepository } from "@/repositories/transaction-repository";
import { ErroTransactionNaoExiste } from "../@errors/transaction/erro-transaction-nao-existe";
import { ErroAoDeletarTransaction } from "../@errors/transaction/erro-deletar-transaction";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "../@errors/transaction/erro-deletar-transaction-sua-igreja";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";

interface DeletarTransactionRequest {
  id: string;
  idUserEquipeDirigente: string;
}

interface DeletarTransactionResponse {
  boolean: boolean;
}

export class DeletarTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    idUserEquipeDirigente,
  }: DeletarTransactionRequest): Promise<DeletarTransactionResponse> {
    const transactionExiste =
      await this.transactionRepository.findTransactionById(id);
    if (!transactionExiste) throw new ErroTransactionNaoExiste();

    const equiqueDirigenteExiste =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(
        idUserEquipeDirigente
      );
    if (!equiqueDirigenteExiste) throw new ErroEquipeDirigenteNaoExiste();

    //verificar se o usuario que esta deletando pertence a essa igreja que a transaction esta cadastrada
    if (transactionExiste.igrejaId !== equiqueDirigenteExiste.igrejaId)
      throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

    const deletarTransaction =
      await this.transactionRepository.deletarTransaction(id);
    if (!deletarTransaction) throw new ErroAoDeletarTransaction();

    return {
      boolean: true,
    };
  }
}
