import { Prisma, FichaEquipe } from "@prisma/client";

export interface FichaEquipeRepository {
  findFichaEquipeByFichaId(fichaId: string): Promise<FichaEquipe[] | null>;
  findFichaEquipeById(id: string): Promise<FichaEquipe | null>;
  deletarFichaEquipeById(id: string): Promise<FichaEquipe | null>;
  cadastrarFichaEquipe(fichaId: string, data: Prisma.FichaEquipeCreateInput): Promise<FichaEquipe | null>;
  atualizarFichaEquipe(id: string, data: Prisma.FichaEquipeUpdateInput): Promise<FichaEquipe | null>;
  pegarEquipesFicha(
    take: number,
    pageEquipe: number,
    fichaId: string,
  ): Promise<{
    equipesFicha: FichaEquipe[];
    totalCount: number;
  }>;
}
