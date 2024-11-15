export class EmailJaCadastrado extends Error {
    constructor() {
        super('Já existe uma conta cadastrada com esse e-mail.')
    }
}