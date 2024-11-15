import { Prisma, Igreja } from '@prisma/client'

export interface IgrejaRepository {
    cadastrarIgreja(data: Prisma.IgrejaCreateInput): Promise<Igreja>
    findIgrejaById(id: string): Promise<Igreja | null>
    findIgrejaByNome(nome: string): Promise<Igreja | null>
    findIgrejaByEmail(email: string): Promise<Igreja | null>
    findIgrejaByCnpj(cnpj: string): Promise<Igreja | null>
    deletarIgreja(id: string): Promise<Igreja | null>
    pegarIgrejas(take: number, page: number): Promise<{ igrejas: Prisma.IgrejaGetPayload<{}>[]; totalCount: number, }>
    pegarUnicaIgreja(id: string): Promise<Igreja | null>
    atualizarIgreja(id: string, data: Prisma.IgrejaUncheckedUpdateInput ): Promise<Igreja>
}