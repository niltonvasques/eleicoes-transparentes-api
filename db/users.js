var database    = require('../database.js');

exports.findByToken = function(token, fn) {
  database.connection.query(
      "SELECT * FROM Usuario WHERE bearerToken = ?", 
      [token], 
      function (err, rows, fields){
        if(err){
          console.log("Something bad happens.");
          return fn(null, null);
        }
        if(rows.length > 0){
          return fn(null, rows[0]);
        } 
        return fn(null, null);
      }
  );
};

exports.findById = function(id, fn) {
  database.connection.query(
      "SELECT * FROM Usuario WHERE id = ?", 
      [id], 
      function (err, rows, fields){
        if(err){
          console.log("Something bad happens.");
          return fn(null, null);
        }
        if(rows.length > 0){
          return fn(null, rows[0]);
        } 
        return fn(null, null);
      }
  );
};
