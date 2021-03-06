var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connection.query("SELECT * FROM Transacao", function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id;
  database.connection.query("SELECT * FROM Transacao WHERE id = ? ", [candidato_id], 
      function(err, rows, fields){
        if(err) throw err;
        res.send(rows);
  });
}

