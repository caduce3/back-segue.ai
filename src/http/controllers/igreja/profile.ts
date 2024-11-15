import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfileIgreja(request: FastifyRequest, reply: FastifyReply) {
    try {
        
        const igrejaId = request.user.sub;

        const getFuncionarioUseCase = makePegarUnicoFuncionarioUseCase();

        const igreja = await getFuncionarioUseCase.execute({
            id: userId
        });

        return reply.status(200).send(user);

    } catch (error) {
        if(error instanceof FuncionarioNaoExiste) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
