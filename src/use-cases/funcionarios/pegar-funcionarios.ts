import { FuncionarioRepository } from "@/repositories/funcionario-repository";
import { Funcionario } from "@prisma/client";
import { ErroAoCarregarFuncionarios } from "../@errors/funcionario/funcionario-erro-carregar";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";

interface pegarFuncionariosUseCaseRequest {
    page: number;
    nome?: string;
    telefone?: string;
    email?: string;
    cpf?: string;
}

interface pegarFuncionariosUseCaseResponse {
    funcionariosList: Funcionario[];
    totalItens: number;
    totalPages: number;
    currentPage: number;
}

export class PegarFuncionariosUseCase {
    constructor(
        private funcionarioRepository: FuncionarioRepository
    ) {}
    
    async execute({
        page, nome, telefone, email, cpf
    }: pegarFuncionariosUseCaseRequest): Promise<pegarFuncionariosUseCaseResponse> {

        if (page <= 0) page = 1;

        const take = 10;
        const { funcionarios, totalCount } = await this.funcionarioRepository.pegarFuncionarios(take, page, nome, telefone, email, cpf);

        if (!funcionarios || funcionarios.length === 0) {
            return {
                funcionariosList: [],
                totalItens: 0,
                totalPages: 0,
                currentPage: page
            };
        }

        const totalPages = Math.ceil(totalCount / take);
        if (totalPages === 0) throw new ErroAoCarregarFuncionarios();
        if (page > totalPages) throw new ErroAoCarregarPagina();

        return { 
            funcionariosList: funcionarios,
            totalItens: totalCount,
            totalPages,
            currentPage: page
        };
    }
}
