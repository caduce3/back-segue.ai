import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigente } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";

interface PegarUnicoUserEquipeDirigenteRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicoUserEquipeDirigenteResponse {
  userEquipeDirigente: EquipeDirigente;
}

export class PegarUnicoUserEquipeDirigenteUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicoUserEquipeDirigenteRequest): Promise<PegarUnicoUserEquipeDirigenteResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const userEquipeDirigente =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(id);
    if (!userEquipeDirigente) throw new ErroEquipeDirigenteNaoExiste();

    return {
      userEquipeDirigente,
    };
  }
}
