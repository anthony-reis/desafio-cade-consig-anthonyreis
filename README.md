# Desafio Cadê Consig — Solução (Frontend)

Este repositório contém minha solução para o desafio “Desafio Cadeconsig - Desenvolvedor Full Stack”, com foco no frontend em Next.js 15 consumindo os endpoints do backend fornecido.

A entrega segue a estrutura solicitada, com a pasta `upload-contratos` contendo o projeto do frontend e o currículo na raiz do repositório.

## O que foi entregue (requisitos do desafio)

### Estrutura obrigatória (3º ponto)

- Repositório público no GitHub com o nome `desafio-cade-consig-anthonyreis`.
- Pasta `upload-contratos` contendo o projeto frontend.
- Currículo atualizado na raiz (`Anthony_Desenvolvedor.pdf`).
- Commits seguindo o padrão Conventional Commits (ex.: `feat:`, `chore:`, `style:`).

### Stack obrigatória (2º ponto)

- Next.js 15 + App Router.
- TypeScript.
- Tailwind CSS.
- Shadcn UI.
- React Hook Form + Zod (validação).
- React Query (TanStack Query) para cache, loading states e revalidação.
- Nuqs para lidar com parâmetros via URL (filtros/paginação).

### Telas obrigatórias

- Tela de Login com autenticação via API e validação completa.
- Tela de Upload de CSV com feedback visual (sucesso/erro).
- Tela de Listagem de Contratos com filtros e paginação.

## Visão geral da solução

A aplicação foi construída em Next.js (App Router) e organiza as rotas em dois grupos principais: rotas públicas (sign-in) e rotas privadas (dashboard e upload).

A comunicação com o backend é feita através de Route Handlers em `app/api/*`, que atuam como um “BFF” (Backend for Frontend): eles validam a sessão e encaminham as requisições para o backend Nest, anexando o token no header `Authorization`.

## Fluxo de autenticação e segurança com Iron Session

A autenticação foi implementada com **iron-session** para evitar armazenar JWT no `localStorage` e manter o token fora do alcance do JavaScript no navegador.

### Como o token é salvo (login)

1. O formulário de login valida `usuario` e `senha` com React Hook Form + Zod antes do envio.
2. O frontend chama o endpoint do próprio Next: `POST /api/auth/login`.
3. Esse route handler faz um `fetch` para o backend em `POST /login` e recebe `access_token`.
4. O token é decodificado para obter dados do usuário (ex.: `sub` e `usuario`) e então é salvo na sessão: `session.accessToken = accessToken` e `session.isLoggedIn = true`, seguido de `await session.save()`.
5. Ao salvar, o iron-session “sela” os dados da sessão e os persiste em um cookie no navegador.

### Onde o token fica armazenado

O `accessToken` fica armazenado no cookie de sessão configurado como `cookieName: "auth_session"`, com `httpOnly: true`, `sameSite: "strict"` e `secure` em produção, o que reduz o risco de vazamento por XSS e restringe o envio do cookie em cenários cross-site.

O segredo de criptografia/assinatura do cookie vem de `process.env.SESSION_SECRET`, e a sessão tem `maxAge` configurado para 24 horas.

### Como o token é utilizado nas requisições autenticadas

Nas rotas privadas, quando a aplicação precisa consultar contratos ou fazer upload, ela chama endpoints internos do Next (ex.: `/api/contratos` e `/api/contratos/upload`).

Esses route handlers:

- Carregam a sessão via `getIronSession(cookies(), sessionOptions)` e validam `session.isLoggedIn` e `session.accessToken`.
- Encaminham a requisição ao backend adicionando `Authorization: Bearer ${session.accessToken}`.

Na prática:

- `GET /api/contratos` repassa filtros e paginação via query string e injeta o `Bearer token` no header.
- `POST /api/contratos/upload` repassa o `FormData` do CSV e injeta o `Bearer token` no header.

### Logout

O logout chama `POST /api/auth/logout`, que executa `session.destroy()` para invalidar a sessão e remover o cookie do usuário.

### Por que essa abordagem é mais segura do que localStorage

- Cookies `httpOnly` não podem ser lidos por JavaScript, então mesmo que exista uma falha XSS, o token não fica acessível via `window.localStorage`/`document.cookie`.
- A sessão é “stateless” e baseada em cookie (sem necessidade de banco para sessão), mantendo a implementação simples e adequada para o desafio.

## BFF (Route Handlers) e integração com o backend

A aplicação usa Route Handlers do Next como camada intermediária, principalmente por dois motivos:

1. Centralizar autenticação (sessão) e evitar espalhar token no client.
2. Garantir que chamadas autenticadas sempre passem por um ponto único que injeta `Authorization`.

Endpoints internos relevantes:

- `POST /api/auth/login`: autentica e salva sessão com `accessToken`.
- `GET /api/auth/me`: retorna o usuário atual a partir da sessão.
- `POST /api/auth/logout`: destrói a sessão.
- `GET /api/contratos`: lista contratos e repassa query params.
- `POST /api/contratos/upload`: faz upload do CSV via `multipart/form-data`.

Observação: no código atual, os route handlers encaminham para `http://localhost:3000/login`, `http://localhost:3000/contratos` e `http://localhost:3000/contratos/upload`.

## Dashboard: filtros, paginação e URL (Nuqs)

A tela de listagem utiliza um hook dedicado para filtros e paginação, e o estado é sincronizado com a URL usando Nuqs (com `NuqsAdapter` habilitado no provider global).

Isso permite:

- Compartilhar URL com filtros aplicados.
- Persistir filtros/página ao recarregar a página.
- Melhor experiência com navegação (voltar/avançar).

## Formulários e validação (React Hook Form + Zod)

O formulário de login usa:

- `useForm` do React Hook Form com `zodResolver(loginSchema)`.
- `loginSchema` define validações mínimas (usuario obrigatório e senha com mínimo de caracteres) e fornece tipagem inferida (`LoginInput`).

Além disso, o botão de submit é desabilitado durante loading e o erro é exibido de forma clara quando presente.

## React Query (TanStack Query)

A aplicação usa React Query para padronizar fetch e estados assíncronos no frontend, com `QueryClientProvider` configurado globalmente.

A configuração inclui `staleTime` e desabilita `refetchOnWindowFocus` para evitar recarregamentos inesperados durante navegação.

## Arquitetura Frontend: Services, Hooks e Axios

A aplicação é organizada em camadas para manter o código simples e fácil de manter. Cada parte tem uma responsabilidade clara.
O fluxo funciona assim:\
→ Hook (use-\*)\
→ Service\
→ Axios\
→ API do Next.js (/api)\
→ Backend NestJS

Os componentes React cuidam apenas da tela. Eles mostram os dados e reagem às ações do usuário, sem fazer chamadas diretas para a API.

Os hooks personalizados (use-\*) fazem a busca de dados e controlam estados como carregamento e erro. Eles usam o React Query, que ajuda com cache e atualização automática dos dados.

Os services concentram as chamadas HTTP. Isso evita código repetido e facilita mudanças futuras, como trocar a forma de comunicação com a API.

O Axios é configurado em um único lugar, com interceptors para tratar erros de autenticação. Quando a sessão expira, o usuário é redirecionado para a tela de login.

As requisições passam pelas rotas de API do Next.js, que fazem a ponte com o backend em NestJS, onde ficam as regras de negócio e o acesso ao banco de dados.

Essa organização deixa o projeto mais limpo, fácil de entender e mais simples de evoluir com o tempo.

## Como as requisições funcionam

A ideia é: o **frontend (React)** não conversa direto com o backend NestJS.  
Ele chama os endpoints internos do **Next.js em `/api/...`**, e o Next faz o “meio de campo”.

### O que é cada parte

- **BFF (Route Handlers do Next em `app/api/*`)**: são rotas no servidor do Next que recebem as chamadas do frontend e repassam para o NestJS. Aqui é onde a autenticação fica centralizada.
- **iron-session (sessão)**: guarda o `accessToken` (JWT) **no cookie de sessão**, de forma que o token não fica “solto” no código do navegador.
- **Axios (`lib/api/client.ts`)**: é o “cliente HTTP” usado para chamar `/api/...` com configurações prontas (baseURL, timeout, interceptors).
- **Services (`lib/services/*`)**: funções que encapsulam chamadas (ex.: `userService.login()`), evitando repetir URL/método em vários lugares.
- **Custom hooks (`lib/hooks/use-*`)**: juntam “lógica de tela” + services (loading, error, toast, navegação, React Query).

---

## Como é o fluxo?

Pense assim: sua tela (React) conversa com o **Next.js** em `/api/*`, e o Next.js conversa com o backend (NestJS).  
Isso deixa o Next como um “porteiro”: ele controla quem pode entrar e leva a mensagem pro backend.

### 1) Fluxo do Login (primeira vez)

1. Você digita usuário e senha e clica em **Entrar**.
2. A tela chama um **hook** (`useAuth`), que é só um “organizador” da lógica (loading, erro e sucesso).
3. O hook chama um **service** (`userService.login`), que é só uma função responsável por “falar com a API”.
4. O service usa o **Axios** para chamar `POST /api/auth/login` (rota do Next).
5. O **Route Handler** (BFF) do Next chama o backend NestJS (`POST /login`) usando `fetch`.
6. Se o backend aceitar, ele devolve um token (JWT) e o Next salva isso na sessão (iron-session) dentro de um cookie seguro.
7. A tela recebe “ok” e te manda para a Home.

### 2) Fluxo do GET Contratos (já logado)

1. A tela chama um hook (`useContratos`) para buscar os contratos.
2. O hook chama um service (`contratoService.listar`).
3. O service usa Axios para chamar `GET /api/contratos`.
4. O navegador envia junto o cookie da sessão automaticamente porque o Axios está com `withCredentials: true`.
5. O Route Handler (BFF) do Next lê a sessão, pega o token e chama o backend NestJS (`GET /contratos`) usando `fetch` + `Authorization: Bearer <token>`.
6. O backend valida o token e devolve os contratos; o Next repassa para a tela.

---

## Por que usar Axios na tela?

O Axios ajuda a deixar todas as requisições padronizadas num lugar só (ex.: `baseURL`, `timeout`, `withCredentials`).
E os **interceptors** permitem tratar coisas globais (ex.: se der 401, redirecionar pro login) sem repetir esse código em todo componente.

## Por que usar `fetch` no BFF (Route Handlers)?

Route Handlers do Next trabalham com as APIs padrão da Web (`Request`/`Response`), então usar `fetch` ali é direto e combina com o ambiente do Next.

## Como rodar o projeto

### Pré-requisitos

- Node.js 18+.
- Backend do desafio rodando localmente e acessível pelos endpoints utilizados.

### Instalação

```bash
git clone https://github.com/anthony-reis/desafio-cade-consig-anthonyreis.git
cd desafio-cade-consig-anthonyreis/upload-contratos
npm install
npm run dev
```

## Variáveis de ambiente

A sessão depende de `SESSION_SECRET` (mínimo recomendado: 32+ caracteres), pois ela é a chave usada para selar/descriptografar o cookie do iron-session.

Exemplo (.env.local):

- `SESSION_SECRET` = "coloque-aqui-uma-string-grande-e-segura-com-32-caracteres-ou-mais"
- `NODE_ENV` = "development"
