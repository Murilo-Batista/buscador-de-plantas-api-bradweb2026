# React + Vite + API Web Gratuita

Atividade da matéria Desenvolvimento Web-Front End - Professora Ana Paula Muller Giancoli, ADS IFSPBRA

Integração com a API Trefle

1. Crie uma conta em [trefle.io](https://trefle.io/) e gere seu token de acesso.
2. Na raiz do projeto, crie um arquivo chamado `.env.local`.
3. Copie o conteúdo de `.env.example` e substitua o texto de exemplo pelo seu token:

   `VITE_TREFLE_TOKEN=seu_token_aqui`

4. Execute `npm run dev` e pesquise pelo nome popular ou científico de uma planta.

A pesquisa utiliza `/api/v1/plants/search` e o botão **Saiba mais** consulta `/api/v1/plants/{slug}`. Os resultados são paginados pelo link `next` retornado pela Trefle.
