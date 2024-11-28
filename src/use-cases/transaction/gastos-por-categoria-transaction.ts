import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import { CategoriaTransacao } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";

interface GastosPorCategoriaTransactionRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  dateInit: string;
  dateFinish: string;
}

interface GastosPorCategoriaTransactionResponse {
  categoria: CategoriaTransacao;
  total: number;
  porcentagem: number;
}
[];

export class GastosPorCategoriaTransactionUseCase {
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
  }: GastosPorCategoriaTransactionRequest): Promise<
    GastosPorCategoriaTransactionResponse[]
  > {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const dataInicial = new Date(dateInit);
    const dataFinal = new Date(dateFinish);

    const gastosPorCategoria =
      await this.transactionRepository.gastosPorCategoria(
        igrejaId,
        dataInicial,
        dataFinal
      );

    return gastosPorCategoria.map((gasto) => ({
      categoria: gasto.categoria as CategoriaTransacao,
      total: gasto.total,
      porcentagem: gasto.porcentagem,
    }));
  }
}
