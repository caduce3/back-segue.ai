import { Igreja, EquipeDirigente } from "@prisma/client";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { UsuarioNaoExiste } from "../@errors/erro-usuario-nao-existe";

type IgrejaSemSenha = Omit<Igreja, "senha">;
type UsuarioSemSenha = Omit<EquipeDirigente, "senha">;

interface GetProfileUseCaseRequest {
  id: string;
}

interface GetProfileUseCaseResponse {
  usuario: IgrejaSemSenha | UsuarioSemSenha;
}

export class GetProfileUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private equipeDirigenteRepository: EquipeDirigenteRepository
  ) {}

  async execute({
    id,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const igreja = await this.igrejaRepository.pegarUnicaIgreja(id);

    if (igreja) {
      const { senha, ...igrejaSemSenha } = igreja;
      return { usuario: igrejaSemSenha };
    }

    const usuario =
      await this.equipeDirigenteRepository.findUserEquipeDirigenteById(id);

    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    const { senha, ...usuarioSemSenha } = usuario;
    return { usuario: usuarioSemSenha };
  }
}
