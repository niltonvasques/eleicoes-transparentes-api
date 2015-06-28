var mysql      = require('mysql');

exports.connect = function (callback){
  connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'etuser',
    password : 'LVum3NNfqIvkw',
    database : 'eleicao'
  });

  exports.connection = connection;

  connection.connect(function(err){
    callback(err);
    if(err){
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.on('close', function(err) {
    if (err) {
      // Oops! Unexpected closing of connection, lets reconnect back.
      console.log('Connection was closed unexpectedly.');
      connection = mysql.createConnection(connection.config);
    } else {
      console.log('Connection closed normally.');
    }
  });
};

exports.disconnect = function (){
  this.connection.end(function (err) {
    if(err){
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('disconnected id ' + connection.threadId);
  });
};
