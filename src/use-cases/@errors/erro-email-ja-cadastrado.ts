export class EmailJaCadastrado extends Error {
    constructor() {
        super('Este e-mail já existe.')
    }
}