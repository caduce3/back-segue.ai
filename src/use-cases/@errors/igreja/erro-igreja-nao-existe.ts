export class IgrejaNaoExiste extends Error {
    constructor() {
        super('Essa igreja não está cadastrada.')
    }
}