import { IgrejaNaoExiste } from "@/use-cases/@errors/igreja/erro-igreja-nao-existe";
import { makePegarUnicaIgrejaUseCase } from "@/use-cases/@factories/igreja/make-pegar-unica-igreja-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfileIgreja(request: FastifyRequest, reply: FastifyReply) {
    try {
        
        const igrejaId = request.user.sub;

        const getIgrejaUseCase = makePegarUnicaIgrejaUseCase();

        const igreja = await getIgrejaUseCase.execute({
            id: igrejaId
        });

        return reply.status(200).send(igreja);

    } catch (error) {
        if(error instanceof IgrejaNaoExiste) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
