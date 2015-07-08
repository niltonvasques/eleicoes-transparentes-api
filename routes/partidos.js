var database    = require('../database.js');
var utils       = require('../utils.js');

exports.findAll = function(req, res){
  database.connection.query("SELECT id, sigla, nome, numero FROM Partido ORDER BY sigla", function(err, rows, fields){
    if(err) throw err;
    res.json(rows);
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id;
  database.connection.query("SELECT id, sigla, nome, numero  FROM Partido WHERE id = ? ORDER BY sigla", [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.json(rows);
      }
  );
}

exports.receitas = function(req, res){
  var eleicao_id = req.params.id;
  var partido_id = req.params.p_id;
  var query = "SELECT * FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Partido WHERE id = ? ) AND eleicao_id = ?";
  utils.paginatedQuery(req, res, query, [partido_id, eleicao_id]);
}

exports.receitasTotal = function(req, res){
  var eleicao_id = req.params.id;
  var partido_id = req.params.p_id;
  database.connection.query(
      "SELECT sum(valor) as total FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Partido WHERE id = ?) AND eleicao_id = ?",
      [partido_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.despesas = function(req, res){
  var eleicao_id = req.params.id;
  var partido_id = req.params.p_id;
  var query = "SELECT * FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Partido WHERE id = ? ) AND eleicao_id = ?";
  utils.paginatedQuery(req, res, query, [partido_id, eleicao_id]);
}

exports.despesasTotal = function(req, res){
  var eleicao_id = req.params.id;
  var partido_id = req.params.p_id;
  database.connection.query(
      "SELECT sum(valor) as total FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Partido WHERE id = ?) AND eleicao_id = ?",
      [partido_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.allReceitasTotal = function(req, res){
  var eleicao_id = req.params.id;
  database.connection.query(
      "SELECT p.nome, SUM(valor) as total FROM Transacao INNER JOIN Partido p ON p.agenteEleitoral_id = creditado_id WHERE creditado_id IN (SELECT agenteEleitoral_id FROM Partido ) AND eleicao_id = ? GROUP BY creditado_id ORDER BY total DESC",
      [eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.allDespesasTotal = function(req, res){
  var eleicao_id = req.params.id;
  database.connection.query(
      "SELECT p.nome, SUM(valor) as total FROM Transacao INNER JOIN Partido p ON p.agenteEleitoral_id = debitado_id WHERE debitado_id IN (SELECT agenteEleitoral_id FROM Partido ) AND eleicao_id = ? GROUP BY debitado_id ORDER BY total DESC",
      [eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}
