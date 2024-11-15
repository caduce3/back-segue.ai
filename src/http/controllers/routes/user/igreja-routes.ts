import { FastifyInstance } from "fastify";

import { cadastrarIgreja } from "../../igreja/cadastrar";
import { authenticateIgreja } from "../../igreja/authenticate";
import { refresh } from "../../igreja/refresh";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { getProfileIgreja } from "../../igreja/profile";

export async function igrejaRoutes(app: FastifyInstance) {
    app.post('/cadastrar_igreja', cadastrarIgreja)
    app.post('/sessions_igreja', authenticateIgreja)
    app.patch('/token/refresh', refresh)

    app.get('/me_igreja', { onRequest: [verifyJwt] }, getProfileIgreja);

}