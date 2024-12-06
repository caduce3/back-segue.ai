export class ErroAoAtualizarFichaEquipe extends Error {
    constructor() {
        super('Erro ao atualizar equipe para essa ficha.')
    }
}