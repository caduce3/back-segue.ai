import { Palestra } from "@prisma/client";
import { verificarAcessoIgreja } from "@/services/verificar-acesso-igreja";
import { ErroCadastrarPalestra } from "../@errors/palestra/erro-cadastrar-palestra";
import { PalestraRepository } from "@/repositories/palestra-repository";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";

interface CadastrarPalestraRequest {
  igrejaId: string;
  idUserEquipeDirigente: string;
  nomePalestrante: string;
  temaPalestra: string;
  descricaoPalestra: string;
  duracaoPalestra: number;
  dataPalestra: string;
  notaPalestra: number;
  observacoes?: string;
}

interface CadastrarPalestraResponse {
  palestra: Palestra;
}

export class CadastrarPalestraUseCase {
  constructor(
    private palestraRepository: PalestraRepository,
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    igrejaId,
    idUserEquipeDirigente,
    nomePalestrante,
    temaPalestra,
    descricaoPalestra,
    duracaoPalestra,
    dataPalestra,
    notaPalestra,
    observacoes,
  }: CadastrarPalestraRequest): Promise<CadastrarPalestraResponse> {
    await verificarAcessoIgreja(
      igrejaId,
      idUserEquipeDirigente,
      this.igrejaRepository,
      this.equipeDirigenteRepository
    );

    const palestra = await this.palestraRepository.cadastrarPalestra({
      nomePalestrante,
      temaPalestra,
      descricaoPalestra,
      duracaoPalestra,
      notaPalestra,
      observacoes,
      dataPalestra: new Date(dataPalestra),
      userIdCreatedAt: idUserEquipeDirigente,
      userIdUpdatedAt: idUserEquipeDirigente,
      igreja: {
        connect: {
          id: igrejaId,
        },
      },
    });

    if (!palestra) {
      throw new ErroCadastrarPalestra();
    }

    return {
      palestra,
    };
  }
}
