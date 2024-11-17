> # Documentação API - back-segueai
> 
> ## Descrição
> Esta é a documentação básica da API **back-segueai**, construída utilizando **Fastify**, **Prisma ORM** e outras bibliotecas auxiliares. A API foi desenvolvida com Node.js e TypeScript.
> FrontEnd da aplicação: https://github.com/caduce3/front-segue.ai
> 
> ---
> 
> ## Requisitos do Ambiente
> 
> - **Node.js**: >= 18
> - **Gerenciador de pacotes**: npm ou yarn
> 
> ---
> 
> ## Scripts Disponíveis
> 
> - `npm run dev`: Inicia o servidor em modo de desenvolvimento com **Hot Reload**.
> - `npm run build`: Compila o código TypeScript para JavaScript na pasta build.
> - `npm start`: Inicia o servidor utilizando o código compilado.
> 
> ---
> 
> ## Dependências Principais
> 
> - **Fastify**: Framework web rápido e focado em performance.
> - **Prisma ORM**: ORM para gerenciar o banco de dados.
> - **bcryptjs**: Para hash de senhas.
> - **pg**: Driver PostgreSQL.
> - **zod**: Validação de dados.
> 
> ---
> 
> ### Instalação e execução
> 
> 1. Clone o repositório:
> 
> ```bash
> git clone <url-do-repositorio>
> cd back-segueai
> ```
> 
> 2. Instale as dependências:
> 
> ```bash
> npm install
> ```
> 
> 3. Configure o banco de dados:
> 
> ```bash
> npx prisma migrate dev
> ```
> 
> 4. Execute o servidor em modo de desenvolvimento:
> 
> ```bash
> npm run dev
> ```
> 
> ---
> 
> ### Pontos Importantes
> 
> 1. Crie um `.env` igual ao `.env.example`:
> 
> ```env
> NODE_ENV=dev
> DATABASE_CLIENT=pg
> DATABASE_URL="postgresql://postgres:(SENHA)@localhost:(N°_DA_PORTA)/(NOME_DO_BANCO_DE_DADOS)?schema=public"
> NODE_VERSION=20.15.0
> JWT_SECRET="SUA_CHAVE_JWT_SECRETE"
> URL_TESTE_FRONT="http://localhost:(n° porta)"
> ```
> 
> ---
> 
> ## Endpoints
> 
> ### 1° Cadastrar Igreja
> 
> - **POST** `/cadastrar_igreja`
> - **Descrição**: Endpoint para cadastrar uma nova igreja. Este é o primeiro passo antes de acessar outros recursos da API.
> - **Body**:
> 
> ```json
> {
>   "nome": "string",
>   "cnpj": "string",
>   "email": "string",
>   "senha": "string",
>   "telefone": "string",
>   "endereco": "string",
>   "cidade": "string",
>   "estado": "string",
>   "cep": "string"
> }
> ```
> 
> - **Resposta de Sucesso (200)**:
> 
> ```json
> {
>   "message": "Igreja cadastrada com sucesso! Entre em contato com: cadulucenapj@gmail.com para ativar sua conta."
> }
> ```
> - **Descrição da Resposta**: Caso o cadastro da igreja seja bem-sucedido, será retornada a mensagem de sucesso junto com a instrução para entrar em contato para ativação da conta. Em desenvolvimento pode logar normalmente pois está como degault o status da igreja para ATIVO.
> 
> ---
> 
> ### 2° Autenticação
> 
> - **POST** `/sessions`
> - **Descrição**: Endpoint para autenticação, irá gerar um token JWT.
> - **Body**:
> 
> ```json
> {
>   "email": "string",
>   "senha": "string"
> }
> ```
> 
> - **Resposta de Sucesso (200)**:
> 
> ```json
> {
>   "token": "jwt_token_aqui"
> }
> ```
> - **Descrição da Resposta**: Caso o email e a senha estejam corretos, o servidor retornará um token JWT que pode ser utilizado para autenticação nas demais rotas da API.
