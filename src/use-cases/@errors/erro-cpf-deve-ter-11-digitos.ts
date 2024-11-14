export class CpfDeveConterOzeDigitos extends Error {
    constructor() {
        super('CPF inválido. Deve conter 11 dígitos.')
    }
}