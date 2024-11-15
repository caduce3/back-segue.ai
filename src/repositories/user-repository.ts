import { Prisma, User } from '@prisma/client'

export interface UserRepository {
    registrarUser(data: Prisma.UserCreateInput): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
    findUserById(id: string): Promise<User | null>
    deletarUser(id: string): Promise<boolean>
    atualizarUser(id: string, data: Prisma.UserUncheckedUpdateInput ): Promise<User>
    pegarUsers(take: number, page: number, nome?: string, telefone?: string, email?: string): Promise<{ users: Prisma.UserGetPayload<{
        include: {
            igreja: true
        }
    }>[]; totalCount: number, }>
    pegarUnicoUser(id: string): Promise<User | null>
}