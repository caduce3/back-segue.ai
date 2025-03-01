import { Palestra } from "@prisma/client";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { PalestraRepository } from "@/repositories/palestra-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { ErroPalestraNaoExiste } from "../@errors/palestra/erro-palestra-nao-existe";
import { ErroAtualizarPalestra } from "../@errors/palestra/erro-atualizar-palestra";

interface AtualizarPalestraRequest {
  id: string;
  igrejaId: string;
  idUserEquipeDirigente: string;
  nomePalestrante?: string;
  temaPalestra?: string;
  descricaoPalestra?: string;
  duracaoPalestra?: number;
  dataPalestra?: string;
  notaPalestra?: number;
  observacoes?: string;
}

interface AtualizarPalestraResponse {
  palestra: Palestra;
}

export class AtualizarPalestraUseCase {
  constructor(
    private palestraRepository: PalestraRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
    igrejaId,
    idUserEquipeDirigente,
    nomePalestrante,
    temaPalestra,
    descricaoPalestra,
    duracaoPalestra,
    dataPalestra,
    notaPalestra,
    observacoes,
  }: AtualizarPalestraRequest): Promise<AtualizarPalestraResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const palestraExiste = await this.palestraRepository.findPalestraById(id);
    if (!palestraExiste) throw new ErroPalestraNaoExiste();

    const palestra = await this.palestraRepository.atualizarPalestra(id, {
      nomePalestrante,
      temaPalestra,
      descricaoPalestra,
      duracaoPalestra,
      notaPalestra,
      observacoes,
      dataPalestra: dataPalestra ? new Date(dataPalestra) : undefined,
      userIdUpdatedAt: idUserEquipeDirigente,
    });

    if (!palestra) throw new ErroAtualizarPalestra();

    return {
      palestra,
    };
  }
}
