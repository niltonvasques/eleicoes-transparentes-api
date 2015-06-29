var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connection.query("SELECT * FROM Comite ORDER BY municipio", function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id;
  database.connection.query("SELECT * FROM Comite WHERE id = ? ORDER BY municipio", [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
      });
}

