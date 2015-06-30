## REST API do Projeto [Eleições Transparentes](https://github.com/niltonvasques/eleicoes-transparentes)

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

Iniciar a aplicação:

    npm start

### Tabela REST 

 METHOD | URL | DESC
--------|-----|---------------------------
 GET | /eleicao | Retorna a lista de eleições disponíveis.
 GET | /eleicao/:id | Retorna informações da eleição através com id = :id.
 GET | /eleicao/:id/candidatos | Retorna a lista de candidatos de uma eleição.
 GET | /eleicao/:id/candidatos/:id | Retorna informações do candidato com id = :id.
 GET | /eleicao/:id/candidatos/:id/receitas | Retorna a lista de receitas que um candidato recebeu na eleição.
 GET | /eleicao/:id/candidatos/:id/receitas/total | Retorna a soma de todas as receitas que um candidato recebeu.
 GET | /eleicao/:id/candidatos/:id/despesas | Retorna a lista de despesas que um candidato recebeu na eleição.
 GET | /eleicao/:id/candidatos/:id/despesas/total | Retorna a soma de todas as despesas que um candidado teve na eleição.
 GET | /eleicao/:id/partidos | Retorna a lista de partidos de uma eleição.
 GET | /eleicao/:id/partidos/:id | Retorna informações do partido com id = :id.
 GET | /eleicao/:id/comites | Retorna a lista de comitês de uma eleição.
 GET | /eleicao/:id/comites/:id | Retorna informações de um comitê com id = :id.

