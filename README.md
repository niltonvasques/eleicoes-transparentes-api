## REST API do Projeto [Eleições Transparentes](https://github.com/niltonvasques/eleicoes-transparentes)

[![Join the chat at https://gitter.im/niltonvasques/eleicoes-transparentes](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/niltonvasques/eleicoes-transparentes?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

  - [Instalação](#instalação)
  - [Tabela REST](#tabela-rest)

API REST para expor os dados do projeto Eleições Transparentes.

### Instalação

Instalar o nodejs e o npm:

    curl -L https://npmjs.org/install.sh | sh

Clonar o repositório e instalar os módulos:

    git clone https://github.com/niltonvasques/eleicoes-transparentes-api
    cd eleicoes-transparentes-api
    npm install

Criar arquivo config.json na raiz do repositório, para as configurações do database MySQL, com o seguinte padrão:

```json
{
    "HOST"     : "xxx.xxx.xxx.xxx",
    "user"     : "user",
    "password" : "secret_pass"
}
```

Iniciar a aplicação:

    npm start

### Tabela REST 

STATUS | METHOD | URL | DESC
-------|--------|-----|---------------------------
  [x]  | GET | /eleicoes | Retorna a lista de eleições disponíveis.
  [x]  | GET | /eleicoes/:id | Retorna informações da eleição através com id = :id.
  [ ]  | GET | /eleicoes/:id/despesas/total | Total de despesas em uma eleição com id = :id.
  [ ]  | GET | /eleicoes/:id/receitas/total | Total de receitas em uma eleição com id = :id.
  [x]  | GET | /eleicoes/:id/candidatos | Retorna a lista de candidatos de uma eleição.
  [x]  | GET | /eleicoes/:id/candidatos/:id | Retorna informações do candidato com id = :id.
  [x]  | GET | /eleicoes/:id/candidatos/:id/receitas | Retorna a lista de receitas que um candidato recebeu na eleição.
  [x]  | GET | /eleicoes/:id/candidatos/:id/receitas/total | Retorna a soma de todas as receitas que um candidato recebeu.
  [x]  | GET | /eleicoes/:id/candidatos/:id/despesas | Retorna a lista de despesas que um candidato recebeu na eleição.
  [x]  | GET | /eleicoes/:id/candidatos/:id/despesas/total | Retorna a soma de todas as despesas que um candidado teve na eleição.
  [ ]  | GET | /eleicoes/:id/comites | Retorna a lista de comitês de uma eleição.
  [ ]  | GET | /eleicoes/:id/comites/:id | Retorna informações de um comitê com id = :id.
  [ ]  | GET | /eleicoes/:id/comites/:id/receitas | Retorna a lista de receitas de um comitê com id = :id em uma eleição.
  [ ]  | GET | /eleicoes/:id/comites/:id/receitas/total | Retorna o total de receitas de um comitê com id = :id em uma eleição.
  [ ]  | GET | /eleicoes/:id/comites/:id/despesas | Todas as despesas de um comitê com id = :id.
  [ ]  | GET | /eleicoes/:id/comites/:id/despesas/total | Total de despesas de um comitê com id = :id.
  [x]  | GET | /partidos | Retorna a lista de partidos.
  [x]  | GET | /partidos/:id | Retorna informações do partido com id = :id.
  [ ]  | GET | /eleicoes/:id/partidos/:id/despesas | Lista as despesas do partido com id = :id na eleição.
  [ ]  | GET | /eleicoes/:id/partidos/:id/despesas/total | Total de despesas do partido com id = :id na eleição.
  [ ]  | GET | /eleicoes/:id/partidos/:id/receitas | Lista as receitas do partido com id = :id na eleição.
  [ ]  | GET | /eleicoes/:id/partidos/:id/receitas/total | Total de receitas do partido com id = :id na eleição.
 

