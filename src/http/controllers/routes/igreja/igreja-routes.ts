import { FastifyInstance } from "fastify";

import { cadastrarIgreja } from "../../_igreja/cadastrar";
import { authenticate } from "../../_authenticate/authenticate";
import { refresh } from "../../_authenticate/refresh";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getProfile } from "../../_authenticate/profile";

export async function igrejaRoutes(app: FastifyInstance) {
    app.post('/cadastrar_igreja', cadastrarIgreja)
    app.post('/sessions', authenticate)
    app.patch('/token/refresh', refresh)

    app.get('/me', { onRequest: [verifyJwt] }, getProfile);

}