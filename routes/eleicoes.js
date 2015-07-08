var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connection.query("SELECT * FROM Eleicao ORDER BY ano", function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
}

exports.findById = function(req, res){
  var candidato_id = req.params.id;
  database.connection.query("SELECT * FROM Eleicao WHERE id = ? ORDER BY ano", [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.receitasTotal = function(req, res){
  var query = "SELECT count(*) as qtd, sum(valor) as total FROM Transacao WHERE eleicao_id = 1 AND (creditado_id IN (SELECT agenteEleitoral_id FROM Partido) OR creditado_id IN (SELECT agenteEleitoral_id FROM Candidato) OR creditado_id IN (SELECT agenteEleitoral_id FROM Comite))";
  var eleicao_id = req.params.id;
  database.connection.query(query, [eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.despesasTotal = function(req, res){
  var query = "SELECT count(*) as qtd, sum(valor) as total FROM Transacao WHERE eleicao_id = 1 AND (debitado_id IN (SELECT agenteEleitoral_id FROM Partido) OR debitado_id IN (SELECT agenteEleitoral_id FROM Candidato) OR debitado_id IN (SELECT agenteEleitoral_id FROM Comite))";
  var eleicao_id = req.params.id;
  database.connection.query(query, [eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.rankingDoadoresPJ = function(req, res){
    database.connection.query("SELECT * FROM RankingDoadoresPJ LIMIT 100", 
        function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
    });
}

