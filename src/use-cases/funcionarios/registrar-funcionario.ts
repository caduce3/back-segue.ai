import { FuncionarioRepository } from "@/repositories/funcionario-repository";
import { hash } from "bcryptjs";
import { FuncionarioAlreadyExistsError } from "../@errors/funcionario/funcionario-ja-existe";
import { Funcionario } from "@prisma/client";
import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import { validarFormatarCPF } from "@/services/formatar-cpf";

interface RegisterFuncionarioRequest {
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
}

interface RegisterFuncionarioResponse {
    funcionario: Funcionario
}

export class RegisterFuncionarioUseCase {
    constructor(private funcionarioRepository: FuncionarioRepository) {}

    async execute ({ nome, email, telefone, cpf, senha}: RegisterFuncionarioRequest): Promise<RegisterFuncionarioResponse> {

        const senha_hash = await hash(senha, 6)

        const funcionarioJaExisteEmail = await this.funcionarioRepository.findByEmail(email.trim().toLowerCase())
        const funcionarioJaExisteCpf= await this.funcionarioRepository.findByCpf(cpf)
        
        if(funcionarioJaExisteEmail || funcionarioJaExisteCpf) throw new FuncionarioAlreadyExistsError()
    
        const funcionario = await this.funcionarioRepository.createFuncionario({
            nome,
            email: email.trim().toLowerCase(),
            telefone: validarEFormatarTelefone(telefone),
            cpf: validarFormatarCPF(cpf),
            senha: senha_hash
        })

        return {
            funcionario
        }
    }
}