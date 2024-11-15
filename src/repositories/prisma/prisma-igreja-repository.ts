import { Prisma, Igreja } from "@prisma/client";
import { IgrejaRepository } from "../igreja-repository";
import { prisma } from "@/lib/prisma";

export class PrismaIgrejaRepository implements IgrejaRepository {
  async cadastrarIgreja(data: Prisma.IgrejaCreateInput): Promise<Igreja> {
    const igreja = await prisma.igreja.create({
      data,
    });

    return igreja;
  }

  async findIgrejaById(id: string): Promise<Igreja | null> {
    const igreja = await prisma.igreja.findUnique({
      where: {
        id,
      },
    });

    return igreja;
  }

  async deletarIgreja(id: string): Promise<Igreja | null> {
    const igreja = await prisma.igreja.delete({
      where: {
        id,
      },
    });

    return igreja;
  }

  async pegarIgrejas(
    take: number,
    page: number
  ): Promise<{
    igrejas: Prisma.IgrejaGetPayload<{}>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.IgrejaWhereInput[] = [];

    // if (nome)
    //   conditions.push({ nome: { contains: nome, mode: "insensitive" } });
    // if (descricao)
    //   conditions.push({
    //     descricao: { contains: descricao, mode: "insensitive" },
    //   });
    // if (preco) conditions.push({ preco: { equals: Number(preco) } });
    // if (quantidadeDisponivel)
    //   conditions.push({
    //     quantidadeDisponivel: { equals: Number(quantidadeDisponivel) },
    //   });

    // Garantindo que só passemos o AND se tivermos condições
    const whereClause: Prisma.IgrejaWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.igreja.count({
      where: whereClause,
    });

    const igrejas = await prisma.igreja.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "asc",
      },
      take,
      skip,
    });

    return {
      igrejas,
      totalCount,
    };
  }

  async pegarUnicaIgreja(id: string): Promise<Igreja | null> {
    const igreja = await prisma.igreja.findUnique({
      where: {
        id,
      },
    });

    return igreja;
  }

  async atualizarIgreja(
    id: string,
    data: Prisma.IgrejaUncheckedUpdateInput
  ): Promise<Igreja> {
    const igreja = await prisma.igreja.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return igreja;
  }

  async findIgrejaByNome(nome: string): Promise<Igreja | null> {
    const igreja = await prisma.igreja.findFirst({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive",
        },
      },
    });

    return igreja;
  }

  async findIgrejaByEmail(email: string): Promise<Igreja | null> {
    const igreja = await prisma.igreja.findUnique({
      where: {
        email,
      },
    });

    return igreja;
  }

  async findIgrejaByCnpj(cnpj: string): Promise<Igreja | null> {
    const igreja = await prisma.igreja.findUnique({
      where: {
        cnpj,
      },
    });

    return igreja;
  }
}
