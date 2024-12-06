import { Prisma, FichaEquipe } from "@prisma/client";
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

  async findFichaEquipeById(fichaId: string): Promise<FichaEquipe | null> {
    const fichaEquipe = await prisma.fichaEquipe.findUnique({
      where: {
        id: fichaId,
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
}
