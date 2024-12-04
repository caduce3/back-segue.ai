import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import {
  CoresCirculos,
  Escolaridade,
  Ficha,
  Pastoral,
  Sacramentos,
} from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { FichaRepository } from "@/repositories/ficha-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichajaExiste } from "../@errors/ficha/erro-ficha-ja-existe";
import { FichaNaoExiste } from "../@errors/ficha/erro-ficha-nao-existe";
import { EmailJaCadastrado } from "../@errors/erro-email-ja-cadastrado";

interface AtualizarFichaRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
  nomePastaFichas?: string;
  dataRecebimento?: string;
  nomeJovem?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;
  naturalidade?: string;
  filiacaoPai?: string;
  filiacaoMae?: string;
  escolaridade?: Escolaridade;
  religiao?: string;
  igrejaFrequenta?: string;
  sacramentos?: Sacramentos;
  pastoral?: Pastoral;
  nomeConvidadoPor?: string;
  telefoneConvidadoPor?: string;
  enderecoConvidadoPor?: string;
  observacoes?: string;
  anoEncontro?: string;
  corCirculoOrigem?: CoresCirculos;
}

interface AtualizarFichaResponse {
  ficha: Ficha;
}

export class AtualizarFichaUseCase {
  constructor(
    private fichaRepository: FichaRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
    nomePastaFichas,
    dataRecebimento,
    nomeJovem,
    email,
    telefone,
    endereco,
    dataNascimento,
    naturalidade,
    filiacaoPai,
    filiacaoMae,
    escolaridade,
    religiao,
    igrejaFrequenta,
    sacramentos,
    pastoral,
    nomeConvidadoPor,
    telefoneConvidadoPor,
    enderecoConvidadoPor,
    observacoes,
    anoEncontro,
    corCirculoOrigem,
  }: AtualizarFichaRequest): Promise<AtualizarFichaResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const encontrarFicha = await this.fichaRepository.findFichaById(id);
    if (!encontrarFicha) throw new FichaNaoExiste();

    if (email?.trim().toLowerCase() === encontrarFicha.email)
      throw new EmailJaCadastrado();

    const updateFicha = await this.fichaRepository.atualizarFicha(id, {
      nomePastaFichas,
      dataRecebimento,
      nomeJovem,
      email,
      telefone: telefone
        ? validarEFormatarTelefone(telefone)
        : encontrarFicha.telefone,
      endereco,
      dataNascimento,
      naturalidade,
      filiacaoPai,
      filiacaoMae,
      escolaridade,
      religiao,
      igrejaFrequenta,
      sacramentos,
      pastoral,
      nomeConvidadoPor,
      telefoneConvidadoPor: telefoneConvidadoPor
        ? validarEFormatarTelefone(telefoneConvidadoPor)
        : encontrarFicha.telefoneConvidadoPor,
      enderecoConvidadoPor,
      observacoes,
      anoEncontro,
      corCirculoOrigem,
    });

    return {
      ficha: updateFicha,
    };
  }
}
