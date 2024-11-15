import { Igreja, User } from "@prisma/client";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { UserRepository } from "@/repositories/user-repository";
import { UsuarioNaoExiste } from "../@errors/erro-usuario-nao-existe";

interface GetUnicoUsuarioUseCaseRequest {
  id: string;
}

interface GetUnicoUsuarioUseCaseResponse {
  usuario: Igreja | User;
}

export class GetUnicoUsuarioUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    id,
  }: GetUnicoUsuarioUseCaseRequest): Promise<GetUnicoUsuarioUseCaseResponse> {
    // Tenta encontrar o usuário na tabela Igreja
    const igreja = await this.igrejaRepository.pegarUnicaIgreja(id);

    if (igreja) {
      return { usuario: igreja };
    }

    // Se não encontrar na tabela Igreja, busca na tabela User
    const usuario = await this.userRepository.pegarUnicoUser(id);

    if (!usuario) {
      throw new UsuarioNaoExiste();
    }

    return { usuario };
  }
}
