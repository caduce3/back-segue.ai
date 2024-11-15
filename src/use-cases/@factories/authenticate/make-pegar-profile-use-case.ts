import { PrismaIgrejaRepository } from "@/repositories/prisma/prisma-igreja-repository";
import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { GetProfileUseCase } from "@/use-cases/authenticate/profile";

export function makeGetProfileUseCase() {
  const igrejaRepository = new PrismaIgrejaRepository();
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const getProfileUseCase = new GetProfileUseCase(
    igrejaRepository,
    equipeDirigenteRepository
  );

  return getProfileUseCase;
}
