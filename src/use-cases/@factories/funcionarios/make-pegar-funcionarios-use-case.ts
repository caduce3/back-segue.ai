import { PrismaFuncionarioRepository } from "@/repositories/prisma/prisma-funcionarios-repository";
import { PegarFuncionariosUseCase } from "@/use-cases/funcionarios/pegar-funcionarios";

export function makePegarFuncionariosUseCase() {
    const funcionarioRepository = new PrismaFuncionarioRepository()
    const pegarFuncionariosUseCase = new PegarFuncionariosUseCase(funcionarioRepository)

    return pegarFuncionariosUseCase
}