export class UsuarioNaoExiste extends Error {
    constructor() {
        super('Usuário não existe')
    }
}