var database    = require('./database.js');

exports.paginate = function paginate(query, options, callback) {
  /*jshint validthis:true */
  var origQuery = query;
  var skipFrom, sortBy, columns;
  columns = options.columns || null;
  sortBy = options.sortBy || null;
  callback = callback || function() {};
  var pageNumber = 1;
  var resultsPerPage = 10;
  if(options.limit && !isNaN(options.limit)){
    resultsPerPage = options.limit;
  }
  if(options.page && !isNaN(options.page)){
    pageNumber = options.page;
  }
  skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
  query = query + " LIMIT " + skipFrom + ", " + resultsPerPage;
  if (columns !== null) {
    query = "SELECT " + options.columns + " FROM (" + query + ") AS derivedTable ";
  }
  //query = query.skip(skipFrom).limit(resultsPerPage);
  if (sortBy !== null) {
    //query.sort(sortBy);
  }
  console.log(query);
  database.connection.query( "SELECT count(*) as total FROM ("+origQuery+") AS derivedTable", 
      options.params, 
      function(err, rows, fields){
    if(err){
      return callback(err);
    } 
    var total = rows[0].total;
    var hasMore = Math.max(total - skipFrom, 0);
    database.connection.query( query, options.params, function(err, rows, fields){
      if(err){
        return callback(err);
      } 
      var items = rows.length;
      var json = { 
        page: pageNumber, 
        hasMore: hasMore,
        items: items,
        total: total,
        results: rows
      };
      callback(null, json);
    });
  });
}

