import { compare, hash } from "bcryptjs";
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error";
import { Igreja } from "@prisma/client";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { ErroContaInvativa } from "../@errors/erro-conta-inativa";

interface AuthenticateIgrejaRequest {
  email: string;
  senha: string;
}

interface AuthenticateIgrejaResponse {
  igreja: Igreja;
}

export class AuthenticateIgrejaUseCase {
  constructor(private igrejaRepository: IgrejaRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticateIgrejaRequest): Promise<AuthenticateIgrejaResponse> {
    const igreja = await this.igrejaRepository.findIgrejaByEmail(email);

    if (!igreja) throw new InvalidCredentialsError();
    if (igreja.status === "INATIVO") throw new ErroContaInvativa();

    const doesPasswordMatches = await compare(senha, igreja.senha);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return {
      igreja,
    };
  }
}
