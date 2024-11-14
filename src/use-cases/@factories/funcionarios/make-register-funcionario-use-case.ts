import { PrismaFuncionarioRepository } from "@/repositories/prisma/prisma-funcionarios-repository";
import { RegisterFuncionarioUseCase } from "@/use-cases/funcionarios/registrar-funcionario";

export function makeRegisterFuncionarioUseCase() {
    const funcionarioRepository = new PrismaFuncionarioRepository()
    const registerFuncionarioUseCase = new RegisterFuncionarioUseCase(funcionarioRepository)

    return registerFuncionarioUseCase
}