import { Prisma, Funcionario } from '@prisma/client'

export interface FuncionarioRepository {
    createFuncionario(data: Prisma.FuncionarioCreateInput): Promise<Funcionario>
    findByEmail(email: string): Promise<Funcionario | null>
    findByCpf(cpf: string): Promise<Funcionario | null>
    findById(id: string): Promise<Funcionario | null>
    deletarFuncionario(id: string): Promise<boolean>
    atualizarFuncionario(id: string, data: Prisma.FuncionarioUncheckedUpdateInput ): Promise<Funcionario>
    pegarFuncionarios(take: number, page: number, nome?: string, telefone?: string, email?: string, cpf?: string): Promise<{ funcionarios: Prisma.FuncionarioGetPayload<{
        include: {
            Carrinho: true
        }
    }>[]; totalCount: number, }>
    pegarUnicoFuncionario(id: string): Promise<Funcionario | null>
}