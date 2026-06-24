# UniCarona - prototipo local

Protótipo de site para caronas universitárias do grupo **UniCaronas**. Esta versão roda em terminal local, sem depender do Google Apps Script, e já possui back-end simples, banco SQLite, login funcional, listagem de caronas e publicação básica de caronas.

## Objetivo do protótipo

O UniCarona conecta estudantes que fazem trajetos parecidos até o CEUB, permitindo visualizar caronas disponíveis e publicar uma nova carona de forma simples. A versão atual é um protótipo navegável com funcionalidades reais suficientes para apresentação acadêmica.

## O que foi adaptado

- Remoção da dependência do Google Apps Script.
- Substituição do `main.gs` por um servidor local em Node.js com Express.
- Separação dos arquivos do front-end em `public/index.html`, `public/styles.css` e `public/app.js`.
- Criação de banco local SQLite em `data/unicarona.sqlite`.
- Criação de login com senha criptografada usando `bcryptjs`.
- Criação de sessões por token armazenadas no banco.
- Integração do front-end com a API local.
- Publicação e listagem de caronas salvas no banco.
- Aplicação da nova logo enviada e ajuste da paleta para azul-marinho e turquesa.
- Documentação do back-end, backlog versionado e preenchimento dos artefatos acadêmicos.

## Tecnologias usadas

- Node.js
- Express
- SQLite
- bcryptjs
- HTML, CSS e JavaScript puro

## Como rodar no terminal

Instale o Node.js na versão LTS. Depois abra o terminal dentro da pasta do projeto e execute:

```bash
npm install
npm start
```

Abra no navegador:

```text
http://localhost:3000
```

Para rodar em modo de desenvolvimento com reinício automático:

```bash
npm run dev
```

## Usuários de teste

O banco inicial já cria usuários do grupo para teste:

```text
E-mail: marcelo.rbangelini@sempreceub.com
Senha: 123456
```

```text
E-mail: davi.vidal@sempreceub.com
Senha: 123456
```

O botão **Explorar demonstração** entra com o usuário Marcelo.

## Banco de dados

O banco é criado automaticamente em:

```text
data/unicarona.sqlite
```

Tabelas principais:

| Tabela | Função |
|---|---|
| `users` | Guarda os usuários do protótipo e suas senhas criptografadas |
| `sessions` | Guarda os tokens de sessão do login |
| `rides` | Guarda as caronas publicadas |

Para apagar e recriar o banco com os dados iniciais:

```bash
npm run reset-db
```

## Funcionalidades reais implementadas

### Login

O formulário envia e-mail e senha para o servidor local. O back-end valida a senha com `bcryptjs` e devolve um token de sessão. O navegador guarda esse token no `localStorage`.

### Sessão do usuário

Ao abrir o site, o front-end consulta a rota `/api/auth/me` para saber se existe uma sessão ativa. O logout remove a sessão do banco.

### Listagem de caronas

A tela de explorar caronas carrega os dados do SQLite pela rota:

```text
GET /api/rides
```

### Publicação de carona

Ao publicar uma carona, o front-end envia os dados para:

```text
POST /api/rides
```

Essa rota exige login e salva a carona no banco.

## Rotas da API

| Método | Rota | Função |
|---|---|---|
| GET | `/api/health` | Verifica se o servidor está rodando |
| POST | `/api/auth/login` | Faz login |
| GET | `/api/auth/me` | Retorna o usuário logado |
| POST | `/api/auth/logout` | Encerra a sessão |
| GET | `/api/rides` | Lista as caronas |
| POST | `/api/rides` | Publica uma carona |

## Estrutura do projeto

```text
unicarona-local/
├─ public/
│  ├─ assets/
│  │  ├─ logo-full.png
│  │  ├─ logo-icon.png
│  │  └─ logo-original.png
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
├─ src/
│  ├─ database.js
│  ├─ reset-db.js
│  └─ server.js
├─ data/
│  └─ .gitkeep
├─ docs/
│  ├─ ANALISE_BACKEND.md
│  ├─ AZURE_SPRINTS_BACKLOG.md
│  ├─ BACKLOG_AZURE_VERSIONADO.md
│  ├─ Contrato_Time_UniCarona_Corrigido.docx
│  └─ Contrato_Time_UniCarona_Corrigido.pdf
├─ .env.example
├─ .gitignore
├─ package.json
└─ README.md
```

## Documentação de entrega acadêmica

A pasta `docs/` concentra os artefatos de entrega do projeto:

- `ANALISE_BACKEND.md`: explica o que existia antes e o que foi implementado no back-end local.
- `AZURE_SPRINTS_BACKLOG.md`: registra a organização resumida das sprints.
- `BACKLOG_AZURE_VERSIONADO.md`: apresenta o backlog dividido por sprints, épicos, features, PBIs e tasks.
- `Contrato_Time_UniCarona_Corrigido.docx`: contrato de time ágil preenchido.
- `Contrato_Time_UniCarona_Corrigido.pdf`: versão em PDF do contrato de time ágil preenchido.

## Próximos passos técnicos

- Criar tela real de cadastro de usuário.
- Criar perfil persistido com dados do veículo.
- Criar solicitação de vaga persistida no banco.
- Criar painel de caronas do usuário logado.
- Criar testes automatizados para login e publicação de caronas.
- Melhorar validações de formulário e mensagens de erro.
