export class ErroAoCarregarTransactions extends Error {
    constructor() {
        super('Erro ao carregar transações.')
    }
}