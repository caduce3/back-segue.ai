import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error";
import { Igreja, User } from "@prisma/client";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { ErroContaInvativa } from "../@errors/erro-conta-inativa";
import { UserRepository } from "@/repositories/user-repository";

interface AuthenticateIgrejaRequest {
  email: string;
  senha: string;
}

interface AuthenticateIgrejaResponse {
  usuario: Igreja | User;
}

export class AuthenticateIgrejaUseCase {
  constructor(
    private igrejaRepository: IgrejaRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    email,
    senha,
  }: AuthenticateIgrejaRequest): Promise<AuthenticateIgrejaResponse> {
    const igreja = await this.igrejaRepository.findIgrejaByEmail(email);

    if (!igreja) {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new InvalidCredentialsError();
      } else {
        if (user.status === "INATIVO") throw new ErroContaInvativa();
        const doesPasswordMatches = await compare(senha, user.senha);
        if (!doesPasswordMatches) throw new InvalidCredentialsError();

        return {
          usuario: user,
        };
      }
    } else {
      if (igreja.status === "INATIVO") throw new ErroContaInvativa();
      const doesPasswordMatches = await compare(senha, igreja.senha);
      if (!doesPasswordMatches) throw new InvalidCredentialsError();

      return {
        usuario: igreja,
      };
    }
  }
}
