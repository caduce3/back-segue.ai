import { PrismaFuncionarioRepository } from "@/repositories/prisma/prisma-funcionarios-repository";
import { PegarUnicoFuncionarioUseCase } from "@/use-cases/funcionarios/pegar-unico-funcionario";

export function makePegarUnicoFuncionarioUseCase() {
    const funcionarioRepository = new PrismaFuncionarioRepository()
    const pegarUnicoFuncionarioUseCase = new PegarUnicoFuncionarioUseCase(funcionarioRepository)

    return pegarUnicoFuncionarioUseCase
}