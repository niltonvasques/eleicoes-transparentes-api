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
  database.connection.query( query, options.params, function(err, rows, fields){
    if(err){
      return callback(err);
    } 
    //REGEX to count total results from query
    query = query.replace(new RegExp("SELECT(\\s(.+,)*\\s\\w+\\s|\\s\\w+\\s)FROM"), 
        "SELECT count(*) as total FROM");
    console.log(query);
    database.connection.query( query, options.params, function(err, rows2, fields){
      if(err){
        return callback(err);
      } 
      var total = rows2[0].total;
      var items = rows.length;
      var hasMore = Math.max(total-(skipFrom+items), 0);
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

