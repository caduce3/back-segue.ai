import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/@errors/invalid-credentials-error";
import { makeAuthenticateIgrejaUseCase } from "@/use-cases/@factories/igreja/make-authenticate-igreja-use-case";
import { ErroContaInvativa } from "@/use-cases/@errors/erro-conta-inativa";

export async function authenticateIgrejaFuncionario(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateIgrejaFuncionarioBodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6),
  });

  const { email, senha } = authenticateIgrejaFuncionarioBodySchema.parse(
    request.body
  );

  try {
    const authenticateIgrejaFuncionarioUseCase = makeAuthenticateIgrejaUseCase();

    const { igreja } = await authenticateIgrejaFuncionarioUseCase.execute({
      email,
      senha,
    });

    const token = await reply.jwtSign(
      {
        pasta: igreja.pasta,
      },
      {
        sign: {
          sub: igreja.id,
          expiresIn: "24h",
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        pasta: igreja.pasta,
      },
      {
        sign: {
          sub: igreja.id,
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
