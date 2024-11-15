import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { AuthenticateIgrejaUseCase } from "@/use-cases/authenticate/authenticate";

export function makeAuthenticateIgrejaUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const authenticateIgrejaUseCase = new AuthenticateIgrejaUseCase(
    igrejaRepository,
    equipeDirigenteRepository
  );

  return authenticateIgrejaUseCase;
}
