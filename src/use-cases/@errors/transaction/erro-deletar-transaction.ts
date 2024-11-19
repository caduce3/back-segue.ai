export class ErroAoDeletarTransaction extends Error {
    constructor() {
        super('Erro ao deletar transação.')
    }
}