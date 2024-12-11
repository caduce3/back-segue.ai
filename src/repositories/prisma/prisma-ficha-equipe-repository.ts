import { Prisma, FichaEquipe, Ficha } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FichaRepository } from "../ficha-repository";
import { FichaEquipeRepository } from "../ficha-equipe-repository";

export class PrismaFichaEquipeRepository implements FichaEquipeRepository {
  async deletarFichaEquipeById(id: string): Promise<FichaEquipe | null> {
    const fichaEquipe = await prisma.fichaEquipe.delete({
      where: {
        id,
      },
    });

    return fichaEquipe;
  }

  async findFichaEquipeByFichaId(
    fichaId: string
  ): Promise<FichaEquipe[] | null> {
    const fichaEquipe = await prisma.fichaEquipe.findMany({
      where: {
        fichaId,
      },
    });

    return fichaEquipe;
  }

  async cadastrarFichaEquipe(
    fichaId: string,
    data: Prisma.FichaEquipeCreateInput
  ): Promise<FichaEquipe | null> {
    const ficha = await prisma.ficha.findUnique({
      where: {
        id: fichaId,
      },
    });

    if (!ficha) {
      return null;
    }

    const fichaEquipe = await prisma.fichaEquipe.create({
      data: {
        ...data,
        ficha: {
          connect: {
            id: fichaId,
          },
        },
      },
    });

    return fichaEquipe;
  }

  async findFichaEquipeById(id: string): Promise<FichaEquipe | null> {
    const fichaEquipe = await prisma.fichaEquipe.findUnique({
      where: {
        id,
      },
    });

    return fichaEquipe;
  }

  async atualizarFichaEquipe(
    id: string,
    data: Prisma.FichaEquipeUpdateInput
  ): Promise<FichaEquipe | null> {
    const fichaEquipe = await prisma.fichaEquipe.update({
      where: {
        id,
      },
      data,
    });

    return fichaEquipe;
  }

  async pegarEquipesFicha(
    take: number,
    page: number,
    fichaId: string
  ): Promise<{
    equipesFicha: FichaEquipe[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.FichaEquipeWhereInput[] = [];

    //adicionar a condição do igrejaId
    conditions.push({ fichaId: fichaId });

    // Garantindo que só passemos o AND se tivermos condições
    const whereClause: Prisma.FichaEquipeWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.fichaEquipe.count({
      where: whereClause,
    });

    const equipesFicha = await prisma.fichaEquipe.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    return {
      equipesFicha,
      totalCount,
    };
  }
}
