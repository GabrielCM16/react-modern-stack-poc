# Pokemon Battle Manager

POC desenvolvida para estudo e demonstração de arquiteturas modernas em React utilizando gerenciamento de estado global, server-state, tabelas headless e formulários tipados.

O projeto consome dados da PokéAPI, exibe os Pokémons em uma tabela dinâmica, permite favoritar Pokémons globalmente e criar novos registros localmente através de formulários validados.

---

# Objetivo da POC

Demonstrar a integração entre bibliotecas modernas do ecossistema React, separando corretamente as responsabilidades da aplicação:

- Server State
- Global State
- Cache
- Formulários
- Validação
- Renderização tabular

---

# Tecnologias Utilizadas

## React + Vite + TypeScript

Base da aplicação frontend.

---

## TanStack React Query

Responsável pelo gerenciamento de server-state.

Utilizado para:
- consumo da PokéAPI
- cache automático
- sincronização de dados
- atualização reativa do cache

### Exemplo no projeto

- busca dos primeiros 100 Pokémons
- armazenamento em cache
- atualização local via `setQueryData`

---

## Zustand

Responsável pelo gerenciamento de estado global da aplicação.

Utilizado para:
- Pokémons favoritados
- compartilhamento de estado entre componentes

### Exemplo no projeto

- adicionar/remover favoritos
- atualização reativa global

---

## TanStack Table

Biblioteca headless para tabelas.

Responsável por:
- gerenciamento de colunas
- sorting
- row models
- lógica tabular

### Exemplo no projeto

- tabela dinâmica de Pokémons
- ordenação por ID, Nome e HP

---

## React Hook Form

Responsável pelo gerenciamento performático do formulário.

Utilizado para:
- captura de inputs
- controle de submit
- integração com validação

---

## Zod

Responsável pela validação e tipagem dos dados do formulário.

Utilizado para:
- validação de nome
- validação de HP
- coerção de tipos (`coerce.number()`)

---

# Arquitetura da Aplicação

## Separação de Responsabilidades

### React Query → Server State

Gerencia dados vindos da API.

Exemplos:
- Pokémons da PokéAPI
- cache
- sincronização

---

### Zustand → Global State

Gerencia estado interno compartilhado da aplicação.

Exemplos:
- favoritos
- seleção do usuário

---

### TanStack Table → Camada de Renderização Tabular

Responsável apenas pela lógica da tabela.

Não realiza:
- fetch
- cache
- persistência

---

### RHF + Zod → Formulários e Validação

Responsáveis por:
- gerenciamento do formulário
- validação tipada
- transformação de dados

---

# Fluxo da Aplicação

```text
PokéAPI
   ↓
React Query
   ↓
Cache Global
   ↓
PokemonTable
   ↓
Zustand (favoritos)



# Estrutura Simplificada

```text
src/
 ├── App.tsx
 ├── main.tsx
 ├── index.css
 ├── usePokemons.ts
 ├── store.ts
 ├── PokemonTable.tsx
 └── PokemonForm.tsx
```

---

# Funcionalidades

- Busca dos primeiros 100 Pokémons
- Cache automático
- Tabela dinâmica
- Ordenação de colunas
- Favoritos globais
- Criação local de Pokémons
- Validação tipada
- Atualização reativa sem reload

---

# Conceitos Demonstrados

- Server State vs Client State
- Cache Management
- Global State
- Headless UI
- Form Validation
- Type Inference
- React Architecture
- Reactive Rendering

---

# Como executar

## Instalar dependências

```bash
npm install
```

## Executar ambiente de desenvolvimento

```bash
npm run dev
```

---

# API utilizada

PokéAPI:

https://pokeapi.co/

---

# Autor

Gabriel