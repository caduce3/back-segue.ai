import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroTransactionNaoExiste } from "../@errors/transaction/erro-transaction-nao-existe";

interface PegarUnicaTransactionRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicaTransactionResponse {
  transaction: Transaction;
}

export class PegarUnicaTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicaTransactionRequest): Promise<PegarUnicaTransactionResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const transaction =
      await this.transactionRepository.findTransactionById(id);
    if (!transaction) throw new ErroTransactionNaoExiste();

    return {
      transaction,
    };
  }
}
