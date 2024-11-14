import { FuncionarioRepository } from "@/repositories/funcionario-repository";
import { FuncionarioNaoExiste } from "../@errors/funcionario/funcionario-nao-existe copy";

interface DeletarFuncionarioRequest {
    id: string;
}

interface DeletarFuncionarioResponse {
    boolean: boolean;
}

export class DeletarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) {}

    async execute ({ id }: DeletarFuncionarioRequest): Promise<DeletarFuncionarioResponse> {

        const funcionarioJaExiste = await this.funcionarioRepository.findById(id)
    
        if(!funcionarioJaExiste) throw new FuncionarioNaoExiste()
    
        const deletarFuncionario = await this.funcionarioRepository.deletarFuncionario(id)

        return {
            boolean: deletarFuncionario
        }
    }
}