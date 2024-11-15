import { IgrejaRepository } from "@/repositories/igreja-repository";
import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import { Igreja } from "@prisma/client";
import { hash } from "bcryptjs";
import { EmailJaCadastrado } from "../@errors/igreja/erro-email-ja-existe";
import { CNPJjaExiste } from "../@errors/igreja/erro-cnpj-ja-existe";
import { validarEFormatarCNPJ } from "@/services/validar-formatar-cnpj";
import { validarEFormatarCEP } from "@/services/validar-formatar-cep";

interface CadastrarIgrejaRequest {
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface CadastrarIgrejaResponse {
  igreja: Igreja;
}

export class CadastrarIgrejaUseCase {
  constructor(private igrejaRepository: IgrejaRepository) {}

  async execute({
    nome,
    cnpj,
    email,
    senha,
    telefone,
    endereco,
    cidade,
    estado,
    cep,
  }: CadastrarIgrejaRequest): Promise<CadastrarIgrejaResponse> {
    const senha_hash = await hash(senha, 6);

    const igrejaJaExisteEmail = await this.igrejaRepository.findIgrejaByEmail(
      email.trim().toLowerCase()
    );
    if (igrejaJaExisteEmail) throw new EmailJaCadastrado();

    const igrejaJaExisteCnpj =
      await this.igrejaRepository.findIgrejaByCnpj(cnpj);
    if (igrejaJaExisteCnpj) throw new CNPJjaExiste();

    const igreja = await this.igrejaRepository.cadastrarIgreja({
      nome,
      cnpj: validarEFormatarCNPJ(cnpj),
      email: email.trim().toLowerCase(),
      senha: senha_hash,
      telefone: validarEFormatarTelefone(telefone),
      endereco,
      cidade,
      estado,
      cep: validarEFormatarCEP(cep),
    });

    return {
      igreja,
    };
  }
}
