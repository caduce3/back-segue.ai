import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify({ onlyCookie: true })

    const { cargo } = request.user

    const token = await reply.jwtSign(
        { cargo }, 
        {
        sign: {
            sub: request.user.sub,
            expiresIn: '24h'
        }
        }
    )

    const refreshToken = await reply.jwtSign(
        { cargo }, 
        {
        sign: {
            sub: request.user.sub,
            expiresIn: '7d'
        }
        }
    )

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .status(200)
        .send({token})

    
}