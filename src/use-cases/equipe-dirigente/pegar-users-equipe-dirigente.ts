import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import { EquipeDirigente } from "@prisma/client";
import { ErroAoCarregarPagina } from "../@errors/erro-carregar-pagina";
import { ErroAoCarregarTransactions } from "../@errors/transaction/erro-carregar-transaction";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroAoCarregarUsersEquipeDirigente } from "../@errors/equipeDirigente/erro-carregar-users-equipe-dirigente";

interface PegarUsersEquipeDirigenteRequest {
  page: number;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface PegarUsersEquipeDirigenteResponse {
  equipeDirigenteList: EquipeDirigente[];
  totalItens: number;
  totalPages: number;
  currentPage: number;
}

export class PegarUsersEquipeDirigenteUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    page,
    igrejaId,
    idUserEquipeDirigente,
  }: PegarUsersEquipeDirigenteRequest): Promise<PegarUsersEquipeDirigenteResponse> {
    if (page <= 0) page = 1;
    const take = 10;

    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const { usersEquipeDirigente, totalCount } =
      await this.equipeDirigenteRepository.pegarUsersEquipeDirigente(
        take,
        page,
        igrejaId
      );

    if (!usersEquipeDirigente || usersEquipeDirigente.length === 0) {
      return {
        equipeDirigenteList: [],
        totalItens: 0,
        totalPages: 0,
        currentPage: 0,
      };
    }

    const totalPages = Math.ceil(totalCount / take);
    if (totalPages === 0) throw new ErroAoCarregarUsersEquipeDirigente();
    if (page > totalPages) throw new ErroAoCarregarPagina();

    return {
      equipeDirigenteList: usersEquipeDirigente,
      totalItens: totalCount,
      totalPages,
      currentPage: page,
    };
  }
}
