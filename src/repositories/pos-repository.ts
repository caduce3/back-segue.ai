import { Prisma, Evento } from "@prisma/client";

export interface PosRepository {
  cadastrarEvento(data: Prisma.EventoCreateInput): Promise<Evento>;
  findEventoById(id: string): Promise<Evento | null>;
  deletarEvento(id: string): Promise<Evento | null>;
  pegarEventos(
    take: number,
    page: number,
    igrejaId: string,
    nome?: string,
    dataInicio?: Date,
    dataFim?: Date
  ): Promise<{ eventos: Prisma.EventoGetPayload<{}>[]; totalCount: number }>;
  atualizarEvento(
    id: string,
    data: Prisma.EventoUncheckedUpdateInput
  ): Promise<Evento>;
  getEventosByYear(year: string, igrejaId: string): Promise<Evento[]>;
}
