import { Prisma, Transaction } from '@prisma/client'

export interface TransactionRepository {
    registrarTransaction(data: Prisma.TransactionCreateInput): Promise<Transaction>
    findTransactionById(id: string): Promise<Transaction | null>
    deletarTransaction(id: string): Promise<boolean>
    atualizarTransaction(id: string, data: Prisma.TransactionUncheckedUpdateInput ): Promise<Transaction>
    pegarTransactions(take: number, page: number, igrejaId: string): Promise<{ transactions: Prisma.TransactionGetPayload<{
        include: {
            igreja: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            }
        }
    }>[]; totalCount: number, }>
    totalDepositos(idIgreja: string, dateInit: Date, dateFinish: Date): Promise<number>
    totalInvestimentos(idIgreja: string, dateInit: Date, dateFinish: Date): Promise<number>
    totalDespesas(idIgreja: string, dateInit: Date, dateFinish: Date): Promise<number>
    gastosPorCategoria(idIgreja: string, dateInit: Date, dateFinish: Date): Promise<{categoria: string, total: number, porcentagem: number}[]>
}