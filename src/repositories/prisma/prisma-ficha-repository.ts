import { Prisma, Ficha } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FichaRepository } from "../ficha-repository";

export class PrismaFichaRepository implements FichaRepository {
  async cadastrarFicha(data: Prisma.FichaCreateInput): Promise<Ficha> {
    const ficha = await prisma.ficha.create({
      data,
    });

    return ficha;
  }

  async findFichaByEmail(email: string): Promise<Ficha | null> {
    const ficha = await prisma.ficha.findUnique({
      where: {
        email,
      },
    });

    return ficha;
  }

  async findFichaById(id: string): Promise<Ficha | null> {
    const ficha = await prisma.ficha.findUnique({
      where: {
        id,
      },
    });

    return ficha;
  }

  async deletarFicha(id: string): Promise<Ficha | null> {
    const ficha = await prisma.ficha.delete({
      where: {
        id,
      },
    });

    return ficha;
  }

  async atualizarFicha(
    id: string,
    data: Prisma.FichaUncheckedUpdateInput
  ): Promise<Ficha> {
    const ficha = await prisma.ficha.update({
      where: {
        id,
      },
      data,
    });

    return ficha;
  }
}
