import { PrismaFuncionarioRepository } from "@/repositories/prisma/prisma-funcionarios-repository";
import { DeletarFuncionarioUseCase } from "@/use-cases/funcionarios/deletar-funcionario";

export function makeDeletarFuncionarioUseCase() {
    const funcionarioRepository = new PrismaFuncionarioRepository()
    const deletarFuncionarioUseCase = new DeletarFuncionarioUseCase(funcionarioRepository)

    return deletarFuncionarioUseCase
}