export class ErroTransactionNaoExiste extends Error {
    constructor() {
        super('Não existe essa transação')
    }
}