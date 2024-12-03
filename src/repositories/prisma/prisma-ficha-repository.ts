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
}
