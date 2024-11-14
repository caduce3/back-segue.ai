import { prisma } from '@/lib/prisma'
import { Prisma, Funcionario } from '@prisma/client'
import { FuncionarioRepository } from '../funcionario-repository'

export class PrismaFuncionarioRepository implements FuncionarioRepository {
    async createFuncionario(data: Prisma.FuncionarioCreateInput) {
        const funcionario = await prisma.funcionario.create({
            data
        })
        
        return funcionario
    }

    async findByEmail(email: string): Promise<Funcionario | null> {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                email
            }
        })

        return funcionario
    }

    async findByCpf(cpf: string): Promise<Funcionario | null> {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                cpf
            }
        })

        return funcionario
    }

    async findById(id: string): Promise<Funcionario | null> {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                id
            }
        })

        return funcionario
    }

    async deletarFuncionario(id: string): Promise<boolean> {
        await prisma.funcionario.delete({
            where: {
                id
            }
        })

        return true
    }

    async atualizarFuncionario(id: string, data: Prisma.FuncionarioUpdateInput): Promise<Funcionario> {
        const funcionario = await prisma.funcionario.update({
            where: {
                id
            },
            data: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                cpf: data.cpf,
                status: data.status,
                cargo: data.cargo
            }
        })

        return funcionario
    }

    async pegarFuncionarios(
        take: number, 
        page: number, 
        nome?: string, 
        telefone?: string, 
        email?: string, 
        cpf?: string
    ): Promise<{ 
        funcionarios: Prisma.FuncionarioGetPayload<{
            include: {
                Carrinho: true
            }
        }>[], 
        totalCount: number 
    }> {
    
        const skip = (page - 1) * take;
    
        // Construindo as condições dinamicamente
        const conditions: Prisma.FuncionarioWhereInput[] = [];
    
        if (nome) conditions.push({ nome: { contains: nome, mode: 'insensitive' } });
        if (telefone)  conditions.push({ telefone: { contains: telefone, mode: 'insensitive' } });    
        if (email)  conditions.push({ email: { contains: email, mode: 'insensitive' } });
        if (cpf) conditions.push({ cpf: { contains: cpf, mode: 'insensitive' } });
        
        // Garantindo que só passemos o AND se tivermos condições
        const whereClause: Prisma.FuncionarioWhereInput = conditions.length > 0 ? { AND: conditions } : {};
    
        const totalCount = await prisma.funcionario.count({
            where: whereClause
        });
    
        const funcionarios = await prisma.funcionario.findMany({
            where: whereClause,
            orderBy: {
                nome: 'asc'
            },
            include: {
                Carrinho: true
            },
            take,
            skip,
        });
    
        return {
            funcionarios,
            totalCount
        };
    }

    async pegarUnicoFuncionario(id: string): Promise<Funcionario | null> {
        const funcionario = await prisma.funcionario.findUnique({
            where: {
                id
            }
        })

        return funcionario
    }
}