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

| STATUS    | METHOD | URL | DESC
|----------|--------|-----|---------------------------
|<ul><li>- [x] </li></ul> | GET | /eleicoes | Retorna a lista de eleições disponíveis.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id | Retorna informações da eleição através com id = :id.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/despesas/total | Total de despesas em uma eleição com id = :id.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/receitas/total | Total de receitas em uma eleição com id = :id.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/candidato | Retorna a lista de candidatos de uma eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/candidato/:id | Retorna informações do candidato com id = :id.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/candidato/:id/receitas | Retorna a lista de receitas que um candidato recebeu na eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/candidato/:id/receitas/total | Retorna a soma de todas as receitas que um candidato recebeu.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/candidato/:id/despesas | Retorna a lista de despesas que um candidato recebeu na eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/candidato/:id/despesas/total | Retorna a soma de todas as despesas que um candidado teve na eleição.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/comites | Retorna a lista de comitês de uma eleição.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/comite/:id | Retorna informações de um comitê com id = :id.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/comite/:id/receitas | Retorna a lista de receitas de um comitê com id = :id em uma eleição.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/comite/:id/receitas/total | Retorna o total de receitas de um comitê com id = :id em uma eleição.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/comite/:id/despesas | Todas as despesas de um comitê com id = :id.
<ul><li>- [ ] </li></ul> | GET | /eleicao/:id/comite/:id/despesas/total | Total de despesas de um comitê com id = :id.
<ul><li>- [x] </li></ul> | GET | /partidos | Retorna a lista de partidos.
<ul><li>- [x] </li></ul> | GET | /partido/:id | Retorna informações do partido com id = :id.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/partido/:id/despesas | Lista as despesas do partido com id = :id na eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/partido/:id/despesas/total | Total de despesas do partido com id = :id na eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/partido/:id/receitas | Lista as receitas do partido com id = :id na eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/partido/:id/receitas/total | Total de receitas do partido com id = :id na eleição.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/partidos/receitas/total | Lista ordenada do total de receitas de todos os partidos em uma eleição com id = :id.
<ul><li>- [x] </li></ul> | GET | /eleicao/:id/partidos/despesas/total | Lista ordenada do total de despesas de todos os partidos em uma eleição com id = :id
