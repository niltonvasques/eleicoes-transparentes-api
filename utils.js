var paginate    = require('node-mysql-paginate');
var database    = require('./database.js');
/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
exports.uid = function(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.paginatedQuery = function (req, res, query, params){
  var limit = 10;
  if(req.query.limit){
    limit = req.query.limit;
  }
  var page = 1;
  if(req.query.page){
    page = req.query.page;
  }
  paginate.paginate(database.connection, query, 
      {
        page : page,
        limit: limit,
        params: params 
      },
      function (err, rows){
        if(err){
          console.log("An unexpected error happens.");
          return;
        }
        res.json(rows);
      }
  );
}
