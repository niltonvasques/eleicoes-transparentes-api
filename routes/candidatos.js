var database    = require('../database.js')


exports.findAll = function(req, res){
  database.connect( function(err){
    if(err) return;
    database.connection.query("SELECT * FROM Candidato", function(err, rows, fields){
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
    database.connection.query("SELECT * FROM Candidato WHERE id = ? ", [candidato_id], 
        function(err, rows, fields){
          if(err) throw err;
          res.send(rows);
        }
        );
    database.disconnect();
  });
}

