export class FichaEquipeNaoExiste extends Error {
    constructor() {
        super('Essa ficha de equipe não existe')
    }
}