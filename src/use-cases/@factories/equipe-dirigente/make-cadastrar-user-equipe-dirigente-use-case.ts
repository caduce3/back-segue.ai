import { PrismaEquipeDirigenteRepository } from "@/repositories/prisma/prisma-equipe-dirigente-repository";
import { CadastrarUserEquipeDirigenteUseCase } from "@/use-cases/equipe-dirigente/cadastrar-user-equipe-dirigente";

export function makeCadastrarUserEquipeDirigenteUseCase() {
  const equipeDirigenteRepository = new PrismaEquipeDirigenteRepository();
  const cadastrarUserEquipeDirigenteUseCase =
    new CadastrarUserEquipeDirigenteUseCase(equipeDirigenteRepository);

  return cadastrarUserEquipeDirigenteUseCase;
}
