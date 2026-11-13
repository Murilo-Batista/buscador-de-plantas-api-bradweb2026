# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Integração com a API Trefle

1. Crie uma conta em [trefle.io](https://trefle.io/) e gere seu token de acesso.
2. Na raiz do projeto, crie um arquivo chamado `.env.local`.
3. Copie o conteúdo de `.env.example` e substitua o texto de exemplo pelo seu token:

   `VITE_TREFLE_TOKEN=seu_token_aqui`

4. Execute `npm run dev` e pesquise pelo nome popular ou científico de uma planta.

A pesquisa utiliza `/api/v1/plants/search` e o botão **Saiba mais** consulta `/api/v1/plants/{slug}`. Os resultados são paginados pelo link `next` retornado pela Trefle.

**Atenção à chave:** nesta versão, a chamada é feita diretamente pelo navegador, portanto uma variável `VITE_` fica visível para quem inspecionar a aplicação. Use-a apenas em ambiente de desenvolvimento/teste. Para publicar o site, mova as chamadas para um backend ou função serverless que mantenha o token em variável de ambiente privada.
