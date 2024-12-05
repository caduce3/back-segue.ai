export class ErroAoCriarFichaEquipe extends Error {
    constructor() {
        super('Erro ao cadastrar equipe para essa ficha.')
    }
}