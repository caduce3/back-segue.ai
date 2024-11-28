import { Prisma, Transaction } from "@prisma/client";
import { TransactionRepository } from "../transaction-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionRepository implements TransactionRepository {
  async registrarTransaction(
    data: Prisma.TransactionCreateInput
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }

  async findTransactionById(id: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async deletarTransaction(id: string): Promise<boolean> {
    await prisma.transaction.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async atualizarTransaction(
    id: string,
    data: Prisma.TransactionUncheckedUpdateInput
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.update({
      where: {
        id,
      },
      data,
    });

    return transaction;
  }

  async pegarTransactions(
    take: number,
    page: number,
    igrejaId: string
  ): Promise<{
    transactions: Prisma.TransactionGetPayload<{
      include: {
        igreja: {
          select: {
            id: true;
            nome: true;
            email: true;
          };
        };
      };
    }>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.TransactionWhereInput[] = [];

    // if (nome)
    //   conditions.push({ nome: { contains: nome, mode: "insensitive" } });
    // if (telefone)
    //   conditions.push({
    //     telefone: { contains: telefone, mode: "insensitive" },
    //   });
    // if (email)
    //   conditions.push({ email: { contains: email, mode: "insensitive" } });

    //adicionar a condição do igrejaId
    conditions.push({ igrejaId: igrejaId });

    // Garantindo que só passemos o AND se tivermos condições
    const whereClause: Prisma.TransactionWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.transaction.count({
      where: whereClause,
    });

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: {
        nome: "desc",
      },
      include: {
        igreja: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      take,
      skip,
    });

    return {
      transactions,
      totalCount,
    };
  }

  async totalDepositos(
    idIgreja: string,
    dateInit: Date,
    dateFinish: Date
  ): Promise<number> {
    const totalDepositos = await prisma.transaction.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        igrejaId: idIgreja,
        tipo: "DEPOSITO",
        date: {
          gte: dateInit,
          lte: dateFinish,
        },
      },
    });

    // Retorna o total ou 0 caso seja undefined
    return totalDepositos._sum.valor || 0;
  }

  async totalInvestimentos(
    idIgreja: string,
    dateInit: Date,
    dateFinish: Date
  ): Promise<number> {
    const totalInvestimentos = await prisma.transaction.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        igrejaId: idIgreja,
        tipo: "INVESTIMENTO",
        date: {
          gte: dateInit,
          lte: dateFinish,
        },
      },
    });

    return totalInvestimentos._sum.valor || 0;
  }

  async totalDespesas(
    idIgreja: string,
    dateInit: Date,
    dateFinish: Date
  ): Promise<number> {
    const totalDespesas = await prisma.transaction.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        igrejaId: idIgreja,
        tipo: "DESPESA",
        date: {
          gte: dateInit,
          lte: dateFinish,
        },
      },
    });

    return totalDespesas._sum.valor || 0;
  }

  async gastosPorCategoria(idIgreja: string, dateInit: Date, dateFinish: Date): Promise<{ categoria: string; total: number; porcentagem: number; }[]> {

    const gastosPorCategoria = await prisma.transaction.groupBy({
      by: ['categoria'],
      _sum: {
        valor: true
      },
      where: {
        igrejaId: idIgreja,
        tipo: "DESPESA",
        date: {
          gte: dateInit,
          lte: dateFinish,
        },
      }
    });

    const totalGastos = gastosPorCategoria.reduce((acc, curr) => acc + (curr._sum.valor || 0), 0);

    const gastosPorCategoriaComPorcentagem = gastosPorCategoria.map((gasto) => {
      const porcentagem = ((gasto._sum.valor || 0) / totalGastos) * 100;
      return {
        categoria: gasto.categoria,
        total: gasto._sum.valor || 0,
        porcentagem: porcentagem
      }
    });

    //ordenar do maior gasto para o menor
    gastosPorCategoriaComPorcentagem.sort((a, b) => b.total - a.total);

    return gastosPorCategoriaComPorcentagem;
  }
}
