import { IgrejaRepository } from "@/repositories/igreja-repository";
import { Ficha } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaRepository } from "@/repositories/ficha-repository";
import { FichaNaoExiste } from "../@errors/ficha/erro-ficha-nao-existe";

interface PegarUnicaFichaRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicaFichaResponse {
  ficha: Ficha;
}

export class PegarUnicaFichaUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository,
    private fichaRepository: FichaRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicaFichaRequest): Promise<PegarUnicaFichaResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const ficha = await this.fichaRepository.findFichaById(id);
    if (!ficha) throw new FichaNaoExiste();

    return {
      ficha,
    };
  }
}
