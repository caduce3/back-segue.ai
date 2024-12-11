export class ErroContaInvativa extends Error {
    constructor() {
        super('Sua conta está inativa, contate o administrador da paróquia.')
    }
}