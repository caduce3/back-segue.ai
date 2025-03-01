import { Prisma, Palestra } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PalestraRepository } from "../palestra-repository";

export class PrismaPalestraRepository implements PalestraRepository {
  async cadastrarPalestra(data: Prisma.PalestraCreateInput): Promise<Palestra> {
    const palestra = await prisma.palestra.create({
      data,
    });

    return palestra;
  }

  async findPalestraById(id: string): Promise<Palestra | null> {
    const palestra = await prisma.palestra.findUnique({
      where: {
        id,
      },
    });

    return palestra;
  }

  async deletarPalestra(id: string): Promise<Palestra | null> {
    const palestra = await prisma.palestra.delete({
      where: {
        id,
      },
    });

    return palestra;
  }

  async pegarPalestras(
    take: number,
    page: number,
    igrejaId: string
  ): Promise<{
    palestras: Prisma.PalestraGetPayload<{}>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.PalestraWhereInput[] = [];

    //adicionar a condição do igrejaId
    conditions.push({ igrejaId: igrejaId });

    const whereClause: Prisma.PalestraWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.palestra.count({
      where: whereClause,
    });

    const palestras = await prisma.palestra.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    return {
      palestras,
      totalCount,
    };
  }

  async atualizarPalestra(
    id: string,
    data: Prisma.PalestraUncheckedUpdateInput
  ): Promise<Palestra> {
    const palestra = await prisma.palestra.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return palestra;
  }
}
