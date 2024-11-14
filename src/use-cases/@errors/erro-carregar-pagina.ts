export class ErroAoCarregarPagina extends Error {
    constructor() {
        super('Erro ao carregar página.')
    }
}