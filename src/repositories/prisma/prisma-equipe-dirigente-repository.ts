import { prisma } from "@/lib/prisma";
import { Prisma, EquipeDirigente } from "@prisma/client";
import { EquipeDirigenteRepository } from "../equipe-dirigente-repository";

export class PrismaEquipeDirigenteRepository
  implements EquipeDirigenteRepository
{
  async registrarUserEquipeDirigente(data: Prisma.EquipeDirigenteCreateInput) {
    const user = await prisma.equipeDirigente.create({
      data,
    });

    return user;
  }

  async findUserEquipeDirigenteByEmail(
    email: string
  ): Promise<EquipeDirigente | null> {
    const user = await prisma.equipeDirigente.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserEquipeDirigenteById(
    id: string
  ): Promise<EquipeDirigente | null> {
    const user = await prisma.equipeDirigente.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async deletarUserEquipeDirigente(id: string): Promise<boolean> {
    await prisma.equipeDirigente.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async atualizarUserEquipeDirigente(
    id: string,
    data: Prisma.EquipeDirigenteUpdateInput
  ): Promise<EquipeDirigente> {
    const user = await prisma.equipeDirigente.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return user;
  }

  async pegarUsersEquipeDirigente(
    take: number,
    page: number,
    igrejaId: string
  ): Promise<{
    usersEquipeDirigente: Prisma.EquipeDirigenteGetPayload<{
      include: {
        igreja: true;
      };
    }>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.EquipeDirigenteWhereInput[] = [];

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
    const whereClause: Prisma.EquipeDirigenteWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.equipeDirigente.count({
      where: whereClause,
    });

    const usersEquipeDirigente = await prisma.equipeDirigente.findMany({
      where: whereClause,
      orderBy: {
        nome: "desc",
      },
      include: {
        igreja: true,
      },
      take,
      skip,
    });

    return {
      usersEquipeDirigente,
      totalCount,
    };
  }

  async pegarUnicoUserEquipeDirigente(
    id: string
  ): Promise<EquipeDirigente | null> {
    const user = await prisma.equipeDirigente.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
