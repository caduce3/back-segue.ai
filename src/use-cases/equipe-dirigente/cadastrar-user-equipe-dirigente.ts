import { IgrejaRepository } from "@/repositories/igreja-repository";
import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import { EquipeDirigente, Igreja, TipoPasta } from "@prisma/client";
import { hash } from "bcryptjs";
import { EmailJaCadastrado } from "../@errors/igreja/erro-email-ja-existe";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";

interface CadastrarUserEquipeDirigenteRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  ano: string;
  igrejaId: string;
  pasta: TipoPasta;
}

interface CadastrarUserEquipeDirigenteResponse {
  userEquipeDirigente: EquipeDirigente;
}

export class CadastrarUserEquipeDirigenteUseCase {
  constructor(private equipeDirigenteRepository: EquipeDirigenteRepository) {}

  async execute({
    nome,
    email,
    senha,
    telefone,
    ano,
    igrejaId,
    pasta,
  }: CadastrarUserEquipeDirigenteRequest): Promise<CadastrarUserEquipeDirigenteResponse> {
    const senha_hash = await hash(senha, 6);

    const jovemEquipeDirigenteJaExisteEmail =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteByEmail(
        email.trim().toLowerCase()
      );
    if (jovemEquipeDirigenteJaExisteEmail) throw new EmailJaCadastrado();

    const jovemEquipeDirigente =
      await this.equipeDirigenteRepository.registrarUserEquipeDirigente({
        nome,
        email: email.trim().toLowerCase(),
        senha: senha_hash,
        telefone: validarEFormatarTelefone(telefone),
        ano,
        pasta,
        igreja: {
          connect: {
            id: igrejaId,
          },
        },
      });

    return {
      userEquipeDirigente: jovemEquipeDirigente,
    };
  }
}
