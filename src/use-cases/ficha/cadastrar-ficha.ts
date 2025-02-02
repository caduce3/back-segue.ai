import { validarEFormatarTelefone } from "@/services/formatar-telefone";
import {
  CoresCirculos,
  Escolaridade,
  Ficha,
  Sacramentos,
  TipoFicha,
} from "@prisma/client";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { FichaRepository } from "@/repositories/ficha-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { FichajaExiste } from "../@errors/ficha/erro-ficha-ja-existe";

interface CadastrarFichaRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;

  //coisas em comum para casal de jovem
  nomePastaFichas: string;
  dataRecebimento: string;
  endereco: string;
  igrejaFrequenta?: string;
  pastoral?: string;
  observacoes?: string;
  anoEncontro: string;
  corCirculoOrigem: CoresCirculos;
  tipoFicha: TipoFicha;

  //coisas em comum para jovem e homem do casal
  nomePrincipal: string;
  emailPrincipal: string;
  telefonePrincipal: string;
  dataNascimentoPrincipal: string;
  naturalidadePrincipal: string;
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
    tipoFicha,
  }: CadastrarFichaRequest): Promise<CadastrarFichaResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const encontrarFichaPrincipal = await this.fichaRepository.findFichaByEmail(
      emailPrincipal.trim().toLowerCase()
    );
    if (encontrarFichaPrincipal) throw new FichajaExiste();

    const ficha = await this.fichaRepository.cadastrarFicha({
      nomePastaFichas,
      dataRecebimento: new Date(dataRecebimento),
      endereco,
      igrejaFrequenta,
      pastoral,
      observacoes,
      anoEncontro,
      corCirculoOrigem,
      nomePrincipal,
      emailPrincipal: emailPrincipal.trim().toLowerCase(),
      telefonePrincipal: validarEFormatarTelefone(telefonePrincipal),
      dataNascimentoPrincipal: new Date(dataNascimentoPrincipal),
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
        ? new Date(dataNascimentoSecundario)
        : undefined,
      naturalidadeSecundario,
      apelidoSecundario,
      tipoFicha,
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
