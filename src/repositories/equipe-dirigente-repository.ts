import { Prisma, EquipeDirigente } from '@prisma/client'

export interface EquipeDirigenteRepository {
    registrarUserEquipeDirigente(data: Prisma.EquipeDirigenteCreateInput): Promise<EquipeDirigente>
    findUserEquipeDirigenteByEmail(email: string): Promise<EquipeDirigente | null>
    findUserEquipeDirigenteById(id: string): Promise<EquipeDirigente | null>
    deletarUserEquipeDirigente(id: string): Promise<boolean>
    atualizarUserEquipeDirigente(id: string, data: Prisma.EquipeDirigenteUncheckedUpdateInput ): Promise<EquipeDirigente>
    pegarUsersEquipeDirigente(take: number, page: number, igrejaId: string): Promise<{ usersEquipeDirigente: Prisma.EquipeDirigenteGetPayload<{
        include: {
            igreja: {
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            }
        }
    }>[]; totalCount: number, }>
}