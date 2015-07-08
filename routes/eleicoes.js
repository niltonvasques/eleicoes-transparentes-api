var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connection.query("SELECT * FROM Eleicao ORDER BY ano", function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id;
  database.connection.query("SELECT * FROM Eleicao WHERE id = ? ORDER BY ano", [candidato_id], 
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

