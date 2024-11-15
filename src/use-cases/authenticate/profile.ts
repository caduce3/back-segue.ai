import { Igreja, EquipeDirigente } from "@prisma/client";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { UsuarioNaoExiste } from "../@errors/erro-usuario-nao-existe";

interface GetProfileUseCaseRequest {
  id: string;
}

interface GetProfileUseCaseResponse {
  usuario: Igreja | EquipeDirigente;
}

export class GetProfileUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    // Tenta encontrar o usuário na tabela Igreja
    const igreja = await this.igrejaRepository.pegarUnicaIgreja(id);

    if (igreja) {
      return { usuario: igreja };
    }

    // Se não encontrar na tabela Igreja, busca na tabela User
    const usuario = await this.equipeDirigenteRepository.pegarUnicoUserEquipeDirigente(id);

    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return { usuario };
  }
}
