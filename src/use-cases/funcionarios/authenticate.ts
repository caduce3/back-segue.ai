import { FuncionarioRepository } from "@/repositories/funcionario-repository";
import { compare, hash } from "bcryptjs";
import { Funcionario } from "@prisma/client";
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error";
import { FuncionarioInativo } from "../@errors/funcionario/funcionario-inativo";

interface AuthenticateFuncionarioRequest {
    email: string;
    senha: string;
}

interface AuthenticateFuncionarioResponse {
    funcionario: Funcionario
}

export class AuthenticateFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) {}

    async execute ({ email, senha }: AuthenticateFuncionarioRequest): Promise<AuthenticateFuncionarioResponse> {

        const funcionario = await this.funcionarioRepository.findByEmail(email)
    
        if(!funcionario) throw new InvalidCredentialsError()
        if(funcionario.status === "INATIVO") throw new FuncionarioInativo()
        
        const doesPasswordMatches = await compare(senha, funcionario.senha)

        if(!doesPasswordMatches) throw new InvalidCredentialsError()
        
        return {
            funcionario
        }
    }
}