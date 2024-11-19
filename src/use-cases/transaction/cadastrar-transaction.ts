import { IgrejaRepository } from "@/repositories/igreja-repository";
import { TransactionRepository } from "@/repositories/transaction-repository";
import {
  CategoriaTransacao,
  MetodoPagamentoTransacao,
  TipoTransacao,
  Transaction,
} from "@prisma/client";
import { IgrejaNaoExiste } from "../@errors/igreja/erro-igreja-nao-existe";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { ErroEquipeDirigenteNaoExiste } from "../@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "../@errors/transaction/erro-deletar-transaction-sua-igreja";

interface CadastrarTransactionRequest {
  nome: string;
  tipo: TipoTransacao;
  valor: number;
  categoria: CategoriaTransacao;
  descricao?: string;
  metodoPagamento: MetodoPagamentoTransacao;
  date: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
}

interface CadastrarTransactionResponse {
  transaction: Transaction;
}

export class CadastrarTransactionUseCase {
  constructor(
    private transactionRepository: TransactionRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    nome,
    tipo,
    valor,
    categoria,
    descricao,
    metodoPagamento,
    date,
    igrejaId,
    idUserEquipeDirigente,
  }: CadastrarTransactionRequest): Promise<CadastrarTransactionResponse> {
    const verifyIgrejaExist =
      await this.igrejaRepository.findIgrejaById(igrejaId);
    if (!verifyIgrejaExist) throw new IgrejaNaoExiste();

    const equiqueDirigenteExiste =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(
        idUserEquipeDirigente
      );
    if (!equiqueDirigenteExiste) throw new ErroEquipeDirigenteNaoExiste();

    if (verifyIgrejaExist.id !== equiqueDirigenteExiste.igrejaId)
      throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

    const transaction = await this.transactionRepository.registrarTransaction({
      nome,
      tipo,
      valor,
      categoria,
      descricao,
      metodoPagamento,
      date: new Date(date),
      igreja: {
        connect: {
          id: igrejaId,
        },
      },
    });

    return {
      transaction,
    };
  }
}
