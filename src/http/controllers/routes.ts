import { FastifyInstance } from "fastify";
import { registerFuncionario } from "./funcionario/register";
import { authenticateFuncionario } from "./funcionario/authenticate";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getProfile } from "./funcionario/profile";
import { atualizarFuncionario } from "./funcionario/atualizar-funcionario";
import { getFuncionarios } from "./funcionario/pegar-funcionarios";
import { getUnicoFuncionario } from "./funcionario/pegar-unico-funcionario";
import { refresh } from "./funcionario/refresh";
import { verificarCargo } from "../middlewares/verificar-cargo";
import { registrarCliente } from "./cliente/registrar-cliente";
import { deletarCliente } from "./cliente/deletar-cliente";
import { deletarFuncionario } from "./funcionario/deletar-funcionario";
import { atualizarCliente } from "./cliente/atualizar-cliente";
import { criarEnderecoCliente } from "./cliente/criar-endereco-cliente";
import { atualizarEnderecoCliente } from "./cliente/atualizar-endereco-cliente";
import { deletarEnderecoCliente } from "./cliente/deletar-endereco-cliente";
import { pegarClientes } from "./cliente/pegar-clientes";
import { pegarUnicoCliente } from "./cliente/pegar-unico-cliente";
import { pegarUnicoEndereco } from "./endereco/pegar-unico-endereco";
import { cadastrarProduto } from "./produto/cadastrar-produto";
import { deletarProduto } from "./produto/deletar-produto";
import { atualizarProduto } from "./produto/atualizar-produto";
import { pegarProdutos } from "./produto/pegar-produtos";
import { pegarUnicoProduto } from "./produto/pegar-unico-produto";
import { cadastrarVenda } from "./vendas/cadastrar-venda";
import { pegarVendas } from "./vendas/pegar-vendas";
import { pegarUnicaVenda } from "./vendas/pegar-unica-venda";
import { deletarCarrinho } from "./vendas/deletar-carrinho";
import { pegarValorTotalPorMes } from "./vendas/grafico-valorTotal-by-mes";
import { pegarQuantidadeTotalCliente } from "./cliente/quantidade-total-clientes";
import { pegarQuantidadeVendas } from "./vendas/pegar-qtd-vendas";
import { pegarReceita } from "./vendas/pegar-receita";

export async function appRoutes(app: FastifyInstance) {
    app.post('/funcionario', registerFuncionario)
    app.post('/sessions', authenticateFuncionario)

    app.patch('/token/refresh', refresh)

    //precisa estar autenticado para acessar
    
    //ROTAS DE FUNCIONÁRIOS
    app.get('/me', { onRequest: [verifyJwt] }, getProfile);
    app.put('/atualizar_funcionario', { onRequest: [verifyJwt, verificarCargo(['ADMINISTRADOR', 'PROPRIETARIO'])]}, atualizarFuncionario);
    app.post('/pegar_funcionarios', { onRequest: [verifyJwt] }, getFuncionarios)
    app.get('/pegar_unico_funcionario/:id', { onRequest: [verifyJwt, verificarCargo(['ADMINISTRADOR', 'PROPRIETARIO'])] }, getUnicoFuncionario)
    app.post('/deletar_funcionario', { onRequest: [verifyJwt, verificarCargo(['ADMINISTRADOR', 'PROPRIETARIO'])] }, deletarFuncionario);


    //ROTAS DE CLIENTES
    app.post('/registrar_cliente', { onRequest: [verifyJwt, verificarCargo(['ADMINISTRADOR', 'PROPRIETARIO'])] }, registrarCliente);
    app.post('/deletar_cliente', { onRequest: [verifyJwt] }, deletarCliente);
    app.put('/atualizar_cliente', { onRequest: [verifyJwt]}, atualizarCliente);
    app.post('/criar_endereco_cliente', { onRequest: [verifyJwt] }, criarEnderecoCliente);
    app.put('/atualizar_endereco_cliente', { onRequest: [verifyJwt]}, atualizarEnderecoCliente);
    app.post('/deletar_endereco_cliente', { onRequest: [verifyJwt] }, deletarEnderecoCliente);
    app.post('/pegar_clientes', { onRequest: [verifyJwt] }, pegarClientes)
    app.get('/clientes/:id', { onRequest: [verifyJwt] }, pegarUnicoCliente)


    //ROTAS ENDERECO
    app.get('/endereco/:id', { onRequest: [verifyJwt] }, pegarUnicoEndereco)

    //ROTAS PRODUTO
    app.post('/cadastrar_produto', { onRequest: [verifyJwt] }, cadastrarProduto)
    app.post('/deletar_produto', { onRequest: [verifyJwt] }, deletarProduto)
    app.put('/atualizar_produto', { onRequest: [verifyJwt] }, atualizarProduto)
    app.post('/pegar_produtos', { onRequest: [verifyJwt] }, pegarProdutos)
    app.get('/produtos/:id', { onRequest: [verifyJwt] }, pegarUnicoProduto)


    //ROTAS VENDAS
    app.post('/cadastrar_venda', { onRequest: [verifyJwt] }, cadastrarVenda)
    app.post('/pegar_vendas', { onRequest: [verifyJwt] }, pegarVendas)
    app.get('/vendas/:id', { onRequest: [verifyJwt] }, pegarUnicaVenda)
    app.post('/deletar_venda', { onRequest: [verifyJwt] }, deletarCarrinho)


    //GRÁFICOS
    app.post('/valor_total_vendas_por_mes', { onRequest: [verifyJwt] }, pegarValorTotalPorMes)
    app.post('/qtd_clientes', { onRequest: [verifyJwt] }, pegarQuantidadeTotalCliente)
    app.post('/qtd_vendas', { onRequest: [verifyJwt] }, pegarQuantidadeVendas)
    app.post('/pegar_receita', { onRequest: [verifyJwt] }, pegarReceita)

}