import { Igreja } from "@prisma/client";
import { IgrejaRepository } from "@/repositories/igreja-repository";
import { IgrejaNaoExiste } from "../@errors/igreja/erro-igreja-nao-existe";

interface pegarUnicaIgrejaUseCaseRequest {
  id: string;
}

interface pegarUnicaIgrejaUseCaseResponse {
  igreja: Igreja;
}

export class PegarUnicaIgrejaUseCase {
  constructor(private igrejaRepository: IgrejaRepository) {}

  async execute({
    id,
  }: pegarUnicaIgrejaUseCaseRequest): Promise<pegarUnicaIgrejaUseCaseResponse> {
    const igreja = await this.igrejaRepository.pegarUnicaIgreja(id);
    if (!igreja) throw new IgrejaNaoExiste();

    return {
      igreja,
    };
  }
}
