import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import { Transaction } from "@prisma/client";
import { ErroAoCarregarTransactions } from "../@errors/transaction/erro-carregar-transaction";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";

interface SomarTotalTipoTransactionRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  dateInit: string;
  dateFinish: string;
}

interface SomarTotalTipoTransactionResponse {
  totalDepositos: number;
  totalInvestimentos: number;
  totalDespesas: number;
  balancoGeral: number;
}

export class SomarTotalTipoTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    igrejaId,
    idUserEquipeDirigente,
    dateInit,
    dateFinish,
  }: SomarTotalTipoTransactionRequest): Promise<SomarTotalTipoTransactionResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const dataInicial = new Date(dateInit);
    const dataFinal = new Date(dateFinish);

    const totalDepositos = await this.transactionRepository.totalDepositos(
      igrejaId,
      dataInicial,
      dataFinal
    );

    const totalInvestimentos =
      await this.transactionRepository.totalInvestimentos(
        igrejaId,
        dataInicial,
        dataFinal
      );

    const totalDespesas = await this.transactionRepository.totalDespesas(
      igrejaId,
      dataInicial,
      dataFinal
    );

    const balancoGeral = totalDepositos - totalInvestimentos - totalDespesas;

    return {
      totalDepositos,
      totalInvestimentos,
      totalDespesas,
      balancoGeral,
    };
  }
}
