var database    = require('../database.js');
var utils       = require('../utils.js');
var paginate    = require('node-mysql-paginate');


//eleicoes/:id/candidatos?page=2&limit=10&uf=BA&search=NOME&cidade=ALAGOINHAS
exports.findAll = function(req, res){
  var eleicao_id = req.params.id;
  var query = "SELECT id, nome, escolaridade, sexo, municipio, uf, cargo, numero, nacionalidade, tituloEleitoral, ocupacao, estadoCivil, situacaoCandidatura FROM Candidato WHERE eleicao_id = ? ";
  var params = [eleicao_id];
  if(req.query.uf){
    query = query + " AND uf = ? ";
    params.push(req.query.uf);
  }
  if(req.query.search){
    query = query + " AND nome LIKE ? ";
    params.push('%'+req.query.search+'%');
  }
  if(req.query.cidade){
    query = query + " AND municipio LIKE ? ";
    params.push('%'+req.query.cidade+'%');
  }
  query = query + " ORDER BY nome";
  utils.paginatedQuery(req, res, query, params);
}

exports.findById = function(req, res){
  var eleicao_id = req.params.id;
  var candidato_id = req.params.cand_id;
  var query = "SELECT id, nome, escolaridade, sexo, municipio, uf, cargo, numero, nacionalidade, tituloEleitoral, ocupacao, estadoCivil, situacaoCandidatura FROM Candidato WHERE id = ? AND eleicao_id = ? ORDER BY nome";
  utils.paginatedQuery(req, res, query, [candidato_id, eleicao_id]);
}

exports.receitas = function(req, res){
  var eleicao_id = req.params.id;
  var candidato_id = req.params.cand_id;
  var query = "SELECT * FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)";
  utils.paginatedQuery(req, res, query, [candidato_id, eleicao_id]);
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
  utils.paginatedQuery(req, res, query, [candidato_id, eleicao_id]);
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
