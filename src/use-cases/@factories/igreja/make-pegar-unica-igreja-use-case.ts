import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUnicoUsuarioUseCase } from "@/use-cases/authenticate/profile";

export function makeGetUnicoUsuarioUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const userRepository = new PrismaUserRepository();
  const getUnicoUsuarioUseCase = new GetUnicoUsuarioUseCase(igrejaRepository, userRepository);

  return getUnicoUsuarioUseCase;
}
