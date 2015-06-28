var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connect( function(err){
    if(err) return;
    database.connection.query("SELECT * FROM Eleicao", function(err, rows, fields){
      if(err) throw err;
      res.send(rows);
    });
    database.disconnect();
  });
}

exports.findById = function(req, res){
  candidato_id = req.params.id
  database.connect( function(err){
    if(err) return;
    database.connection.query("SELECT * FROM Eleicao WHERE id = ? ", [candidato_id], 
        function(err, rows, fields){
          if(err) throw err;
          res.send(rows);
        }
        );
    database.disconnect();
  });
}

