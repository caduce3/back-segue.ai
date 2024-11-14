import { PrismaFuncionarioRepository } from "@/repositories/prisma/prisma-funcionarios-repository";
import { AtualizarFuncionarioUseCase } from "@/use-cases/funcionarios/atualizar-funcionario";

export function makeAtualizarFuncionarioUseCase() {
    const funcionarioRepository = new PrismaFuncionarioRepository()
    const atualizarFuncionarioUseCase = new AtualizarFuncionarioUseCase(funcionarioRepository)

    return atualizarFuncionarioUseCase
}