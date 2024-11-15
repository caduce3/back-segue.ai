import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            sub: string,
            pasta: 'PAROQUIA' | 'PADRE' | 'FINANCAS' | 'MONTAGEM' | 'POS' | 'PALESTRA' | 'FICHAS'
        }
    }
}