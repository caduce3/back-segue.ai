import { UsuarioNaoExiste } from "@/use-cases/@errors/erro-usuario-nao-existe";
import { makeGetProfileUseCase } from "@/use-cases/@factories/authenticate/make-pegar-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const profileId = request.user.sub;

    const getProfileUseCase = makeGetProfileUseCase();

    const profile = await getProfileUseCase.execute({
      id: profileId,
    });

    return reply.status(200).send(profile);
  } catch (error) {
    if (error instanceof UsuarioNaoExiste) {
      return reply.status(404).send({ message: error.message });
    }
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}
