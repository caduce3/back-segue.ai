import { PrismaFuncionarioRepository } from "@/repositories/prisma/prisma-funcionarios-repository";
import { AuthenticateFuncionarioUseCase } from "@/use-cases/funcionarios/authenticate";

export function makeAuthenticateFuncionarioUseCase(){
    const funcionariosRepository = new PrismaFuncionarioRepository()
    const authenticateFuncionarioUseCase = new AuthenticateFuncionarioUseCase(funcionariosRepository)

    return authenticateFuncionarioUseCase
}