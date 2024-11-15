import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {
  async registrarUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async deletarUser(id: string): Promise<boolean> {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async atualizarUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return user;
  }

  async pegarUsers(
    take: number,
    page: number,
    nome?: string,
    telefone?: string,
    email?: string
  ): Promise<{
    users: Prisma.UserGetPayload<{
      include: {
        igreja: true;
      };
    }>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.UserWhereInput[] = [];

    if (nome)
      conditions.push({ nome: { contains: nome, mode: "insensitive" } });
    if (telefone)
      conditions.push({
        telefone: { contains: telefone, mode: "insensitive" },
      });
    if (email)
      conditions.push({ email: { contains: email, mode: "insensitive" } });

    // Garantindo que só passemos o AND se tivermos condições
    const whereClause: Prisma.UserWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.user.count({
      where: whereClause,
    });

    const users = await prisma.user.findMany({
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
      users,
      totalCount,
    };
  }

  async pegarUnicoUser(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
