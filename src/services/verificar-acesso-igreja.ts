import { IgrejaRepository } from "@/repositories/igreja-repository";
import { EquipeDirigenteRepository } from "@/repositories/equipe-dirigente-repository";
import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { ErroEquipeDirigenteNaoExiste } from "@/use-cases/@errors/equipeDirigente/erro-user-equipe-dirigente-nao-existe";
import { ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja } from "@/use-cases/@errors/transaction/erro-deletar-transaction-sua-igreja";

export async function verificarAcessoIgreja(
  igrejaId: string,
  idUserEquipeDirigente: string,
  igrejaRepository: IgrejaRepository,
  equipeDirigenteRepository: EquipeDirigenteRepository
) {
  const verifyIgrejaExist = await igrejaRepository.findIgrejaById(igrejaId);
  if (!verifyIgrejaExist) throw new IgrejaNaoExiste();

  if (igrejaId === idUserEquipeDirigente) {
    return {
      verifyIgrejaExist,
      verifyUserEquipeDirigenteExist: {
        igrejaId,
      },
    };
  }

  const verifyUserEquipeDirigenteExist =
    await equipeDirigenteRepository.findUserEquipeDirigenteById(
      idUserEquipeDirigente
    );
  if (!verifyUserEquipeDirigenteExist) throw new ErroEquipeDirigenteNaoExiste();

  if (verifyIgrejaExist.id !== verifyUserEquipeDirigenteExist.igrejaId)
    throw new ErroVoceSoPodeRealizarUmaAcaoParaSuaIgreja();

  return {
    verifyIgrejaExist,
    verifyUserEquipeDirigenteExist,
  };
}
