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

interface CadastrarFichaRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  nomePastaFichas: string;
  dataRecebimento: string;
  nomeJovem: string;
  email: string;
  telefone: string;
  endereco: string;
  dataNascimento: string;
  naturalidade: string;
  filiacaoPai?: string;
  filiacaoMae?: string;
  escolaridade: Escolaridade;
  religiao?: string;
  igrejaFrequenta?: string;
  sacramentos: Sacramentos;
  pastoral: Pastoral;
  nomeConvidadoPor?: string;
  telefoneConvidadoPor?: string;
  enderecoConvidadoPor?: string;
  observacoes?: string;
  anoEncontro: string;
  corCirculoOrigem: CoresCirculos;
}

interface CadastrarFichaResponse {
  ficha: Ficha;
}

export class CadastrarFichaUseCase {
  constructor(
    private fichaRepository: FichaRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
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
  }: CadastrarFichaRequest): Promise<CadastrarFichaResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const encontrarFicha = await this.fichaRepository.findFichaByEmail(
      email.trim().toLowerCase()
    );
    if (encontrarFicha) throw new FichajaExiste();

    const ficha = await this.fichaRepository.cadastrarFicha({
      nomePastaFichas,
      dataRecebimento: new Date(dataRecebimento),
      nomeJovem,
      email: email.trim().toLowerCase(),
      telefone: validarEFormatarTelefone(telefone),
      endereco,
      dataNascimento: new Date(dataNascimento),
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
      igreja: {
        connect: {
          id: igrejaId,
        },
      },
    });

    return {
      ficha: ficha,
    };
  }
}
