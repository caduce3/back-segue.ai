export class ErroAoCarregarEquipesFicha extends Error {
    constructor() {
        super('Erro ao carregar equipes desta ficha.')
    }
}