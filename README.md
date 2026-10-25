# Micro-Ledger API

API de processamento financeiro e micro-ledger, desenvolvida em **Node.js puro** (sem frameworks), como projeto de portfólio para praticar arquitetura em camadas, regras de negócio e construção de um servidor HTTP do zero.

## 🛠️ Tecnologias

- Node.js (módulo nativo `http`, sem Express ou outro framework)
- JavaScript (ES Modules — `import`/`export`)
- Armazenamento em memória (`Map`), sem banco de dados externo

## 📦 Como rodar

```bash
git clone https://github.com/prince-devv/micro-ledger-api.git
cd micro-ledger-api
node src/app.js
```

O servidor sobe em `http://localhost:3000`.

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

- CONTROLLERS — recebem a requisição HTTP, leem o corpo (`body`) e devolvem a resposta
- SERVICES — contêm as regras de negócio (validações, cálculos de saldo, estorno)
- REPOSITORIES — responsáveis por guardar e buscar os dados (em memória, via `Map`)

## 📋 Regras de negócio

- Uma conta nunca pode ficar com saldo negativo
- Todo depósito e saque gera uma transação, guardada no histórico
- Transações podem ser estornadas, revertendo o efeito da operação original no saldo

## 🔌 Rotas disponíveis

### Criar conta
`POST /contas`
```json
{
  "dono": "Glass"
}
```

### Depositar
`POST /contas/depositar`
```json
{
  "id": "id-da-conta",
  "valor": 100
}
```

### Sacar
`POST /contas/sacar`
```json
{
  "id": "id-da-conta",
}


## Testes automatizados

O projeto tem testes automatizados escritos com o executor nativo do Node (`node:test`), sem bibliotecas externas.

Para rodar:

    npm test

Os testes ficam em `tests/conta.test.js` e cobrem:

- **Depositar:** depósito válido, conta inexistente, valor negativo e valor zero
- **Sacar:** saque válido, conta inexistente, valor negativo e saldo insuficiente
- **Estornar:** estorno de um depósito, com o saldo voltando ao valor anterior

Os testes de erro conferem a mensagem e o código de status do `AppError`, e não apenas se um erro foi lançado.