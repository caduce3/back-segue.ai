import { FastifyInstance } from "fastify";

import { cadastrarIgreja } from "../../igreja/cadastrar";
import { authenticate } from "../../authenticate/authenticate";
import { refresh } from "../../authenticate/refresh";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getProfile } from "../../authenticate/profile";

export async function igrejaRoutes(app: FastifyInstance) {
    app.post('/cadastrar_igreja', cadastrarIgreja)
    app.post('/sessions', authenticate)
    app.patch('/token/refresh', refresh)

    app.get('/me', { onRequest: [verifyJwt] }, getProfile);

}