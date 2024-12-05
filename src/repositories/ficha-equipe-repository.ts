import { Prisma, FichaEquipe } from "@prisma/client";

export interface FichaEquipeRepository {
  findFichaEquipeByFichaId(fichaId: string): Promise<FichaEquipe[] | null>;
  deletarFichaEquipeById(id: string): Promise<FichaEquipe | null>;
  cadastrarFichaEquipe(fichaId: string, data: Prisma.FichaEquipeCreateInput): Promise<FichaEquipe | null>;
}
