import { FastifyReply, FastifyRequest } from "fastify";
import { makePegarUnicoFuncionarioUseCase } from "@/use-cases/@factories/funcionarios/make-pegar-unico-funcionario-use-case"
import { FuncionarioNaoExiste } from "@/use-cases/@errors/funcionario/funcionario-nao-existe copy";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
        
        const userId = request.user.sub;

        const getFuncionarioUseCase = makePegarUnicoFuncionarioUseCase();

        const user = await getFuncionarioUseCase.execute({
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
