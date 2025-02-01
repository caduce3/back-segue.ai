import { IgrejaRepository } from "@/repositories/igreja-repository";
import { PosRepository } from "@/repositories/pos-repository";
import { Evento } from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroEventoNaoExiste } from "../@errors/pos/erro-evento-nao-existe";

interface PegarUnicoEventoRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUnicoEventoResponse {
  evento: Evento;
}

export class PegarUnicoEventoUseCase {
  constructor(
    private posRepository: PosRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUnicoEventoRequest): Promise<PegarUnicoEventoResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const evento = await this.posRepository.findEventoById(id);
    if (!evento) throw new ErroEventoNaoExiste();

    return {
      evento,
    };
  }
}
