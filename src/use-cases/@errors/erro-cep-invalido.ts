export class CepInvalido extends Error {
    constructor() {
        super('CEP inválido.')
    }
}