export class TelefoneDeveConterOzeDigitos extends Error {
    constructor() {
        super('Telefone inválido. Deve conter 10 ou 11 dígitos.')
    }
}