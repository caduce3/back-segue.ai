import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import {
  CoresCirculos,
  Equipes,
  Escolaridade,
  Ficha,
  FuncaoEquipe,
  Pastoral,
  Sacramentos,
  Status,
} from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { FichaRepository } from "@/repositories/ficha-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichaNaoExiste } from "../@errors/ficha/erro-ficha-nao-existe";
import { EmailJaCadastrado } from "../@errors/erro-email-ja-cadastrado";
import { ErroDeRegraNaMontagem } from "../@errors/ficha/erro-montagem-ficha";
import { validarRegraEquipe } from "@/services/regras-montagem-equipes";

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
  status?: Status;
  equipeAtual?: Equipes;
  funcaoEquipeAtual?: FuncaoEquipe;
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
    status,
    equipeAtual,
    funcaoEquipeAtual,
  }: AtualizarFichaRequest): Promise<AtualizarFichaResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const encontrarFicha = await this.fichaRepository.findFichaById(id);
    if (!encontrarFicha) throw new FichaNaoExiste();

    if (email && email.trim().toLowerCase() !== encontrarFicha.email) {
      const emailJaCadastrado = await this.fichaRepository.findFichaByEmail(
        email.trim().toLowerCase()
      );
      if (emailJaCadastrado) {
        throw new EmailJaCadastrado();
      }
    }
    console.log("################################################################################");
    funcaoEquipeAtual = "EQUIPISTA"
    console.log(equipeAtual, funcaoEquipeAtual)

    //VERIFICAÇÃO DA REGRAS DE CRIAÇÃO DA MONTAGEM DAS EQUIPES
    if (equipeAtual && funcaoEquipeAtual) {
      const qtds = await this.fichaRepository.verifyRulesEquipeAtual(
        igrejaId,
        equipeAtual,
        funcaoEquipeAtual
      );
      validarRegraEquipe(equipeAtual, qtds.qtdEquipeAtual, funcaoEquipeAtual, qtds.qtdFuncaoEquipeAtual);
    }

    const updateFicha = await this.fichaRepository.atualizarFicha(id, {
      nomePastaFichas,
      dataRecebimento: dataRecebimento
        ? new Date(dataRecebimento.split("/").reverse().join("-")).toISOString()
        : undefined,
      nomeJovem,
      email,
      telefone: telefone
        ? validarEFormatarTelefone(telefone)
        : encontrarFicha.telefone,
      endereco,
      dataNascimento: dataNascimento
        ? new Date(dataNascimento.split("/").reverse().join("-")).toISOString()
        : undefined,
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
      status,
      equipeAtual,
      funcaoEquipeAtual,
    });

    return {
      ficha: updateFicha,
    };
  }
}
