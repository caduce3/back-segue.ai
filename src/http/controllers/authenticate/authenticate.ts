import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/@errors/invalid-credentials-error";
import { makeAuthenticateIgrejaUseCase } from "@/use-cases/@factories/authenticate/make-authenticate-use-case";
import { ErroContaInvativa } from "@/use-cases/@errors/erro-conta-inativa";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6),
  });

  const { email, senha } = authenticateBodySchema.parse(
    request.body
  );

  try {
    const authenticateUseCase = makeAuthenticateIgrejaUseCase();

    const { usuario } = await authenticateUseCase.execute({
      email,
      senha,
    });

    const token = await reply.jwtSign(
      {
        pasta: usuario.pasta,
      },
      {
        sign: {
          sub: usuario.id,
          expiresIn: "24h",
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        pasta: usuario.pasta,
      },
      {
        sign: {
          sub: usuario.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (
      error instanceof ErroContaInvativa ||
      error instanceof InvalidCredentialsError
    ) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
