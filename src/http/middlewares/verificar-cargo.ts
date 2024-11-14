import { FastifyReply, FastifyRequest } from "fastify";

export function verificarCargo(cargoParaVerificar: Array<'PROPRIETARIO' | 'ADMINISTRADOR' | 'COLABORADOR'>) {
    return async (request: FastifyRequest, reply: FastifyReply) => {

        const { cargo } = request.user;

        if (!cargoParaVerificar.includes(cargo)) {
            return reply.status(401).send({ message: "Não autorizado!" });
        }
    };
}
