# web - escalada no ceará

esse projeto contém o site escaladanoceara.com.br.

o site foi desenvolvido usando react (iniciado com o
[vite](https://vitejs.dev/guide/)), e utiliza como backend a solução
[supabase](https://supabase.com/).

### ajudando no desenvolvimento

para começar a desenvolver, você precisa ter instalado o `npm` e também o
`supabase-cli` (`docker` é requisito para o ambiente de desenvolvimento do
supabase, então é preciso instalá-lo também).

já no diretório raiz do projeto, execute:

```sh
supabase start
`npm install`
```

o comando `supabase start` vai iniciar um conjunto de containers referente a
solução supabase, ao final do processamento, o código abaixo irá aparecer, nós
precisaremos das variáveis `API` e `anon key`:

```sh
supabase local development setup is running.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

copie e cole o valor das variáveis no arquivo `.env` na raíz do projeto.

```
VITE_DEPLOY_ENV=development
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

agora nós precisamos fazer as `migrations` do projeto no ambiente de
desenvolvimento local.

o seguinte comando irá resetar o banco e em seguida rodar as migrations,
por fim, vai rodar o arquivo supabase/seed.sql.

```sh
supabase db reset
```
