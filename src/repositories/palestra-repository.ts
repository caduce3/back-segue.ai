import { Prisma, Palestra } from "@prisma/client";

export interface PalestraRepository {
  cadastrarPalestra(data: Prisma.PalestraCreateInput): Promise<Palestra>;
  findPalestraById(id: string): Promise<Palestra | null>;
  deletarPalestra(id: string): Promise<Palestra | null>;
  pegarPalestras(
    take: number,
    page: number,
    igrejaId: string
  ): Promise<{
    palestras: Prisma.PalestraGetPayload<{}>[];
    totalCount: number;
  }>;
  atualizarPalestra(
    id: string,
    data: Prisma.PalestraUncheckedUpdateInput
  ): Promise<Palestra>;
}
