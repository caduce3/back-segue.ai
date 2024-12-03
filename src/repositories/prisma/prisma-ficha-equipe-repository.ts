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
}
