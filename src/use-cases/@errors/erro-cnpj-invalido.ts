export class CnpjInvalido extends Error {
    constructor() {
        super('CNPJ inválido.')
    }
}