export class CpfInvalido extends Error {
    constructor() {
        super('CPF inválido.')
    }
}