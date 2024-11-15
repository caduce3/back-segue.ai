export class CNPJjaExiste extends Error {
    constructor() {
        super('Já existe uma conta cadastrada com esse CNPJ.')
    }
}