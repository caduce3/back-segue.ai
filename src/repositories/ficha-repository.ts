import { Prisma, Ficha } from "@prisma/client";

export interface FichaRepository {
  cadastrarFicha(data: Prisma.FichaCreateInput): Promise<Ficha>;
  findFichaByEmail(email: string): Promise<Ficha | null>;
  findFichaById(id: string): Promise<Ficha | null>;
  deletarFicha(id: string): Promise<Ficha | null>;
  atualizarFicha(
    id: string,
    data: Prisma.FichaUncheckedUpdateInput
  ): Promise<Ficha>;
  pegarFichas(
    take: number,
    page: number,
    igrejaId: string,
    nomePastaFichas?: string,
    nomeJovem?: string,
    anoEncontro?: string,
    corCirculoOrigem?: string
  ): Promise<{
    fichas: Prisma.FichaGetPayload<{
      include: {
        FichaEquipe: true;
      };
    }>[];
    totalCount: number;
  }>;
  pegarFichasMontagem(
    take: number,
    page: number,
    igrejaId: string,
    nomePastaFichas?: string,
    nomeJovem?: string,
    anoEncontro?: string,
    corCirculoOrigem?: string
  ): Promise<{
    fichas: Prisma.FichaGetPayload<{
      include: {
        FichaEquipe: true;
      };
    }>[];
    totalCount: number;
  }>;
}
