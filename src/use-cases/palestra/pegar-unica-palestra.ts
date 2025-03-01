import { IgrejaRepository } from "@/repositories/igreja-repository";
import { Palestra } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { PalestraRepository } from "@/repositories/palestra-repository";
import { ErroPalestraNaoExiste } from "../@errors/palestra/erro-palestra-nao-existe";

interface PegarUnicoPalestraRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicoPalestraResponse {
  palestra: Palestra;
}

export class PegarUnicaPalestraUseCase {
  constructor(
    private palestraRepository: PalestraRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicoPalestraRequest): Promise<PegarUnicoPalestraResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const palestra = await this.palestraRepository.findPalestraById(id);
    if (!palestra) throw new ErroPalestraNaoExiste();

    return {
      palestra,
    };
  }
}
