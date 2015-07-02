var database    = require('../database.js');
var paginate    = require('../paginate.js');

function paginated_query(req, res, query, params){
  var limit = 10;
  if(req.query.limit){
    limit = req.query.limit;
  }
  var page = 1;
  if(req.query.page){
    page = req.query.page;
  }
  paginate.paginate(query, 
      {
        page : page,
        limit: limit,
        params: params 
      },
      function (err, rows){
        if(err){
          console.log("An unexpected error happens.");
          return;
        }
        res.json(rows);
      }
  );
}

//eleicoes/:id/candidatos?page=2&limit=10&uf=BA
exports.findAll = function(req, res){
  var eleicao_id = req.params.id;
  var query = "SELECT id, nome, escolaridade, sexo, municipio, uf, cargo, numero, nacionalidade, tituloEleitoral, ocupacao, estadoCivil, situacaoCandidatura FROM Candidato WHERE eleicao_id = ? ";
  var params = [eleicao_id];
  if(req.query.uf){
    query = query + " AND uf = ? ";
    params = [eleicao_id, req.query.uf];
  }
  query = query + " ORDER BY nome";
  paginated_query(req, res, query, params);
}

exports.findById = function(req, res){
  var eleicao_id = req.params.id;
  var candidato_id = req.params.cand_id;
  var query = "SELECT id, nome, escolaridade, sexo, municipio, uf, cargo, numero, nacionalidade, tituloEleitoral, ocupacao, estadoCivil, situacaoCandidatura FROM Candidato WHERE id = ? AND eleicao_id = ? ORDER BY nome";
  paginated_query(req, res, query, [candidato_id, eleicao_id]);
}

exports.receitas = function(req, res){
  var eleicao_id = req.params.id;
  var candidato_id = req.params.cand_id;
  var query = "SELECT * FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)";
  paginated_query(req, res, query, [candidato_id, eleicao_id]);
}

exports.receitasTotal = function(req, res){
  eleicao_id = req.params.id;
  candidato_id = req.params.cand_id;
  database.connection.query(
      "SELECT sum(valor) as total FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)",
      [candidato_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.despesas = function(req, res){
  var eleicao_id = req.params.id;
  var candidato_id = req.params.cand_id;
  var query = 
      "SELECT * FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)";
  paginated_query(req, res, query, [candidato_id, eleicao_id]);
}

exports.despesasTotal = function(req, res){
  eleicao_id = req.params.id;
  candidato_id = req.params.cand_id;
  database.connection.query(
      "SELECT sum(valor) as total FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)",
      [candidato_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}
