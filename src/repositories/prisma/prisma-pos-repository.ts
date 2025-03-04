import { Prisma, Evento } from "@prisma/client";
import { PosRepository } from "../pos-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPosRepository implements PosRepository {
  async cadastrarEvento(data: Prisma.EventoCreateInput): Promise<Evento> {
    const evento = await prisma.evento.create({
      data,
    });

    return evento;
  }

  async findEventoById(id: string): Promise<Evento | null> {
    const evento = await prisma.evento.findUnique({
      where: {
        id,
      },
    });

    return evento;
  }

  async deletarEvento(id: string): Promise<Evento | null> {
    const evento = await prisma.evento.delete({
      where: {
        id,
      },
    });

    return evento;
  }

  async pegarEventos(
    take: number,
    page: number,
    igrejaId: string
  ): Promise<{
    eventos: Prisma.EventoGetPayload<{}>[];
    totalCount: number;
  }> {
    const skip = (page - 1) * take;

    // Construindo as condições dinamicamente
    const conditions: Prisma.EventoWhereInput[] = [];

    //adicionar a condição do igrejaId
    conditions.push({ igrejaId: igrejaId });

    const whereClause: Prisma.EventoWhereInput =
      conditions.length > 0 ? { AND: conditions } : {};

    const totalCount = await prisma.evento.count({
      where: whereClause,
    });

    const eventos = await prisma.evento.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    return {
      eventos,
      totalCount,
    };
  }

  async atualizarEvento(
    id: string,
    data: Prisma.EventoUncheckedUpdateInput
  ): Promise<Evento> {
    const evento = await prisma.evento.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return evento;
  }

  async getEventosByYear(year: string, igrejaId: string): Promise<Evento[]> {
    const eventos = await prisma.evento.findMany({
      where: {
        igrejaId: igrejaId,
        data: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    return eventos;
  }
}
