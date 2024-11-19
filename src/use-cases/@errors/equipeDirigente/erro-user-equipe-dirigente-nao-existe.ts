export class ErroEquipeDirigenteNaoExiste extends Error {
    constructor() {
        super('Este usuário não existe.')
    }
}