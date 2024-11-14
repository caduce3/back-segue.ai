import { FuncionarioRepository } from "@/repositories/funcionario-repository";
import { Funcionario } from "@prisma/client";
import { FuncionarioNaoExiste } from "../@errors/funcionario/funcionario-nao-existe copy";

interface pegarUnicoFuncionarioUseCaseRequest {
    id: string;
}

interface pegarUnicoFuncionarioUseCaseResponse {
    funcionario: Funcionario;
}

export class PegarUnicoFuncionarioUseCase {
    constructor(
        private funcionarioRepository: FuncionarioRepository
    ) {}
    
    async execute({
        id
    }: pegarUnicoFuncionarioUseCaseRequest): Promise<pegarUnicoFuncionarioUseCaseResponse> {

        const funcionario = await this.funcionarioRepository.pegarUnicoFuncionario(id);
        if (!funcionario) throw new FuncionarioNaoExiste()

        return { 
            funcionario
        };
    }
}
