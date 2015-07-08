var mysql      = require('mysql');
var options = require('./options');


exports.connect = function (callback){
  connection = mysql.createConnection({
    host     : options.storageConfig.HOST,
    user     : options.storageConfig.user,
    password : options.storageConfig.password,
    database : 'eleicao'
  });

  exports.connection = connection;

  connection.connect(function(err){
    callback(err);
    if(err){
      console.error('error connecting: ' + err.stack);
      setTimeout(exports.connect(callback), 2000);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.on('close', function(err) {
    if (err) {
      // Oops! Unexpected closing of connection, lets reconnect back.
      console.log('Connection was closed unexpectedly.');
      setTimeout(exports.connect(callback), 2000);
    } else {
      console.log('Connection closed normally.');
    }
  });
  connection.on('error', function(err) {
	console.log('db error', err);
	if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
	  exports.connect(callback);
	} else {                                      // connnection idle timeout (the wait_timeout
	  throw err;                                  // server variable configures this)
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
