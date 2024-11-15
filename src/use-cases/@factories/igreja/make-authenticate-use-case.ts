import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateIgrejaUseCase } from "@/use-cases/authenticate/authenticate";

export function makeAuthenticateIgrejaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const userRepository = new PrismaUserRepository()
  const authenticateIgrejaUseCase = new AuthenticateIgrejaUseCase(igrejaRepository, userRepository);

  return authenticateIgrejaUseCase;
}
