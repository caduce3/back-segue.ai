import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { AuthenticateIgrejaUseCase } from "@/use-cases/igreja/authenticate";

export function makeAuthenticateIgrejaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const authenticateIgrejaUseCase = new AuthenticateIgrejaUseCase(igrejaRepository);

  return authenticateIgrejaUseCase;
}
