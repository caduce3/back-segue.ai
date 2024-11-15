import { FastifyReply, FastifyRequest } from "fastify";

export function verificarPasta(pastaParaVerificar: Array<'PAROQUIA' | 'PADRE' | 'FINANCAS' | 'MONTAGEM' | 'POS' | 'PALESTRA' | 'FICHAS'>) {
    return async (request: FastifyRequest, reply: FastifyReply) => {

        const { pasta } = request.user;

        if (!pastaParaVerificar.includes(pasta)) {
            return reply.status(401).send({ message: "Não autorizado!" });
        }
    };
}
