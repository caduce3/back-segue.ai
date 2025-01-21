import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import {
  CoresCirculos,
  Equipes,
  Escolaridade,
  Ficha,
  FuncaoEquipe,
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

  //coisas em comum para casal de jovem
  nomePastaFichas?: string;
  dataRecebimento?: string;
  endereco?: string;
  igrejaFrequenta?: string;
  pastoral?: string;
  observacoes?: string;
  anoEncontro?: string;
  corCirculoOrigem?: CoresCirculos;

  //coisas em comum para jovem e homem do casal
  nomePrincipal?: string;
  emailPrincipal?: string;
  telefonePrincipal?: string;
  dataNascimentoPrincipal?: string;
  naturalidadePrincipal?: string;
  apelidoPrincipal?: string;
  filiacaoPai?: string;
  filiacaoMae?: string;
  escolaridade?: Escolaridade;
  sacramentos?: Sacramentos;

  //coisas em comum para mulher do casal
  nomeSecundario?: string;
  emailSecundario?: string;
  telefoneSecundario?: string;
  dataNascimentoSecundario?: string;
  naturalidadeSecundario?: string;
  apelidoSecundario?: string;

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
    endereco,
    igrejaFrequenta,
    pastoral,
    observacoes,
    anoEncontro,
    corCirculoOrigem,
    nomePrincipal,
    emailPrincipal,
    telefonePrincipal,
    dataNascimentoPrincipal,
    naturalidadePrincipal,
    apelidoPrincipal,
    filiacaoPai,
    filiacaoMae,
    escolaridade,
    sacramentos,
    nomeSecundario,
    emailSecundario,
    telefoneSecundario,
    dataNascimentoSecundario,
    naturalidadeSecundario,
    apelidoSecundario,

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

    if (
      emailPrincipal &&
      emailPrincipal.trim().toLowerCase() !== encontrarFicha.emailPrincipal
    ) {
      const emailJaCadastrado = await this.fichaRepository.findFichaByEmail(
        emailPrincipal.trim().toLowerCase()
      );
      if (emailJaCadastrado) {
        throw new EmailJaCadastrado();
      }
    }

    if (
      emailSecundario &&
      emailSecundario.trim().toLowerCase() !== encontrarFicha.emailSecundario
    ) {
      const emailJaCadastrado = await this.fichaRepository.findFichaByEmail(
        emailSecundario.trim().toLowerCase()
      );
      if (emailJaCadastrado) {
        throw new EmailJaCadastrado();
      }
    }

    //VERIFICAÇÃO DA REGRAS DE CRIAÇÃO DA MONTAGEM DAS EQUIPES
    if (equipeAtual && funcaoEquipeAtual) {
      const qtds = await this.fichaRepository.verifyRulesEquipeAtual(
        igrejaId,
        equipeAtual,
        funcaoEquipeAtual
      );
      validarRegraEquipe(
        equipeAtual,
        qtds.qtdEquipeAtual,
        funcaoEquipeAtual,
        qtds.qtdFuncaoEquipeAtual
      );
    }

    const updateFicha = await this.fichaRepository.atualizarFicha(id, {
      nomePastaFichas,
      dataRecebimento: dataRecebimento
        ? new Date(dataRecebimento.split("/").reverse().join("-")).toISOString()
        : undefined,
      endereco,
      igrejaFrequenta,
      pastoral,
      observacoes,
      anoEncontro,
      corCirculoOrigem,
      nomePrincipal,
      emailPrincipal: emailPrincipal
        ? emailPrincipal.trim().toLowerCase()
        : undefined,
      telefonePrincipal: telefonePrincipal
        ? validarEFormatarTelefone(telefonePrincipal)
        : undefined,
      dataNascimentoPrincipal: dataNascimentoPrincipal
        ? new Date(
            dataNascimentoPrincipal.split("/").reverse().join("-")
          ).toISOString()
        : undefined,
      naturalidadePrincipal,
      apelidoPrincipal,
      filiacaoPai,
      filiacaoMae,
      escolaridade,
      sacramentos,
      nomeSecundario,
      emailSecundario: emailSecundario
        ? emailSecundario.trim().toLowerCase()
        : undefined,
      telefoneSecundario: telefoneSecundario
        ? validarEFormatarTelefone(telefoneSecundario)
        : undefined,
      dataNascimentoSecundario: dataNascimentoSecundario
        ? new Date(
            dataNascimentoSecundario.split("/").reverse().join("-")
          ).toISOString()
        : undefined,
      naturalidadeSecundario,
      apelidoSecundario,
      status,
      equipeAtual,
      funcaoEquipeAtual,
    });

    return {
      ficha: updateFicha,
    };
  }
}
