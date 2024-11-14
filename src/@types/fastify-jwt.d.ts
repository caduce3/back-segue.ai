import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            sub: string,
            cargo: 'PROPRIETARIO' | 'ADMINISTRADOR' | 'COLABORADOR'
        }
    }
}