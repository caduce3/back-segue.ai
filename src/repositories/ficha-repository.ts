import { Prisma, Ficha } from '@prisma/client'

export interface FichaRepository {
    cadastrarFicha(data: Prisma.FichaCreateInput): Promise<Ficha>
}