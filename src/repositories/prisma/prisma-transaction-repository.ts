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
        igreja: true;
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
        nome: "asc",
      },
      include: {
        igreja: true,
      },
      take,
      skip,
    });

    return {
      transactions,
      totalCount,
    };
  }
}
