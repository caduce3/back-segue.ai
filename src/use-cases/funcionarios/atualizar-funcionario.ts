import { FuncionarioRepository } from "@/repositories/funcionario-repository";
import { FuncionarioNaoExiste } from "../@errors/funcionario/funcionario-nao-existe copy";
import { Funcionario } from "@prisma/client";
import { ErroAoAtualizarFuncionario } from "../@errors/funcionario/funcionario-erro-atualizar";
import { validarFormatarCPF } from "@/services/formatar-cpf";
import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import { FuncionarioAlreadyExistsError } from "../@errors/funcionario/funcionario-ja-existe";

interface AtualizarFuncionarioRequest {
    id: string;
    nome?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    status?: "ATIVO" | "INATIVO";
    cargo?: "PROPRIETARIO" | "ADMINISTRADOR" | "COLABORADOR";
}

interface AtualizarFuncionarioResponse {
    funcionario: Funcionario
}

export class AtualizarFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) {}

    async execute ({ id, nome, email, telefone, cpf, status, cargo }: AtualizarFuncionarioRequest): Promise<AtualizarFuncionarioResponse> {

        const funcionario = await this.funcionarioRepository.findById(id)
        if(!funcionario) throw new FuncionarioNaoExiste()
        
        if(cpf != funcionario.cpf) {
            const verifyCpf = await this.funcionarioRepository.findByCpf(funcionario.cpf)
            if(verifyCpf) throw new FuncionarioAlreadyExistsError()
        }
    
        const atualizarFuncionario = await this.funcionarioRepository.atualizarFuncionario(id, {
            nome,
            email: email ? email.trim().toLowerCase() : funcionario.email,
            telefone: telefone ? validarEFormatarTelefone(telefone) : funcionario.telefone,
            cpf: cpf ? validarFormatarCPF(cpf) : funcionario.cpf,
            status,
            cargo
        })

        if(!atualizarFuncionario) throw new ErroAoAtualizarFuncionario()

        return {
            funcionario: atualizarFuncionario
        }
    }
}