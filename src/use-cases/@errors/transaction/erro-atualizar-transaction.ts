export class ErroAoAtualizarTransactions extends Error {
    constructor() {
        super('Erro ao atualizar transação.')
    }
}