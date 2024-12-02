import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigente, Status, TipoPasta } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroAoAtualizarUserEquipeDirigente } from "../@errors/equipeDirigente/erro-atualizar-user-equipe-dirigente";

interface AtualizarUserEquipeDirigenteRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
  nome?: string;
  email?: string;
  telefone?: string;
  status?: Status;
  pasta?: TipoPasta;
  ano?: string;
}

interface AtualizarUserEquipeDirigenteResponse {
  userEquipeDirigente: EquipeDirigente;
}

export class AtualizarUserEquipeDirigenteUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
    nome,
    email,
    telefone,
    status,
    pasta,
    ano,
  }: AtualizarUserEquipeDirigenteRequest): Promise<AtualizarUserEquipeDirigenteResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const userEquipeDirigente =
      await this.equipeDirigenteRepository.atualizarUserEquipeDirigente(id, {
        nome,
        email,
        telefone,
        status,
        pasta,
        ano,
      });

    if (!userEquipeDirigente) throw new ErroAoAtualizarUserEquipeDirigente();

    return {
      userEquipeDirigente,
    };
  }
}
