var database    = require('../database.js')


exports.findAll = function(req, res){
  eleicao_id = req.params.id;
  database.connection.query( 
      "SELECT id, nome, escolaridade, sexo, municipio, uf, cargo, numero, nacionalidade, tituloEleitoral, ocupacao, estadoCivil, situacaoCandidatura FROM Candidato WHERE eleicao_id = ? ORDER BY nome",
      [eleicao_id], function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
}

exports.findById = function(req, res){
  eleicao_id = req.params.id;
  candidato_id = req.params.cand_id;
  database.connection.query( 
      "SELECT id, nome, escolaridade, sexo, municipio, uf, cargo, numero, nacionalidade, tituloEleitoral, ocupacao, estadoCivil, situacaoCandidatura FROM Candidato WHERE id = ? AND eleicao_id = ? ORDER BY nome",
      [candidato_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.receitas = function(req, res){
  eleicao_id = req.params.id;
  candidato_id = req.params.cand_id;
  database.connection.query(
      "SELECT * FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)",
      [candidato_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
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
  eleicao_id = req.params.id;
  candidato_id = req.params.cand_id;
  database.connection.query(
      "SELECT * FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ? AND eleicao_id = ?)",
      [candidato_id, eleicao_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
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
