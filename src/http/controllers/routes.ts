import { FastifyInstance } from "fastify";
import { registerFuncionario } from "./igreja/cadastrar";
import { authenticateFuncionario } from "./igreja/authenticate";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getProfile } from "./igreja/profile";
import { refresh } from "./igreja/refresh";

export async function appRoutes(app: FastifyInstance) {
    app.post('/funcionario', registerFuncionario)
    app.post('/sessions', authenticateFuncionario)

    app.patch('/token/refresh', refresh)

    //precisa estar autenticado para acessar
    
    //ROTAS DE FUNCIONÁRIOS
    app.get('/me', { onRequest: [verifyJwt] }, getProfile);


}