import { Prisma, Ficha } from '@prisma/client'

export interface FichaRepository {
    cadastrarFicha(data: Prisma.FichaCreateInput): Promise<Ficha>
    findFichaByEmail(email: string): Promise<Ficha | null>
    findFichaById(id: string): Promise<Ficha | null>
}