import { Prisma, FichaEquipe } from "@prisma/client";

export interface FichaEquipeRepository {
  findFichaEquipeByFichaId(fichaId: string): Promise<FichaEquipe[] | null>;
  deletarFichaEquipeById(id: string): Promise<FichaEquipe | null>;
}
