var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connection.query("SELECT * FROM Candidato ORDER BY nome", function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id;
  database.connection.query("SELECT * FROM Candidato WHERE id = ? ORDER BY nome", [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.receitas = function(req, res){
  candidato_id = req.params.id;
  database.connection.query(
      "SELECT * FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ?)",
      [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.receitasTotal = function(req, res){
  candidato_id = req.params.id;
  database.connection.query(
      "SELECT sum(valor) as total FROM Transacao WHERE creditado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ?)",
      [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.despesas = function(req, res){
  candidato_id = req.params.id;
  database.connection.query(
      "SELECT * FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ?)",
      [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

exports.despesasTotal = function(req, res){
  candidato_id = req.params.id;
  database.connection.query(
      "SELECT sum(valor) as total FROM Transacao WHERE debitado_id = "+
        "(SELECT agenteEleitoral_id FROM Candidato WHERE id = ?)",
      [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}
