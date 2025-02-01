import { PosRepository } from "@/repositories/pos-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "../@errors/transaction/erro-deletar-transaction-sua-igreja";
import { ErroAoDeletarEvento } from "../@errors/pos/erro-deletar-evento";
import { ErroEventoNaoExiste } from "../@errors/pos/erro-evento-nao-existe";

interface DeletarEventoRequest {
  id: string;
  idUserEquipeDirigente: string;
}

interface DeletarEventoResponse {
  boolean: boolean;
}

export class DeletarEventoUseCase {
  constructor(
    private posRepository: PosRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    idUserEquipeDirigente,
  }: DeletarEventoRequest): Promise<DeletarEventoResponse> {
    const eventoExiste = await this.posRepository.findEventoById(id);
    if (!eventoExiste) throw new ErroEventoNaoExiste();

    const equiqueDirigenteExiste =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(
        idUserEquipeDirigente
      );
    if (!equiqueDirigenteExiste) throw new ErroEquipeDirigenteNaoExiste();

    //verificar se o usuario que esta deletando pertence a essa igreja que a transaction esta cadastrada
    if (eventoExiste.igrejaId !== equiqueDirigenteExiste.igrejaId)
      throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

    const deletarEvento = await this.posRepository.deletarEvento(id);
    if (!deletarEvento) throw new ErroAoDeletarEvento();

    return {
      boolean: true,
    };
  }
}
