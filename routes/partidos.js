var database    = require('../database.js')

exports.findAll = function(req, res){
  database.connection.query("SELECT * FROM Partido ORDER BY sigla", function(err, rows, fields){
    if(err) throw err;
    res.json(rows);
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id;
  database.connection.query("SELECT * FROM Partido WHERE id = ? ORDER BY sigla", [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.json(rows);
      }
  );
}

