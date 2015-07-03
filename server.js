var express     = require('express'),
    candidatos  = require('./routes/candidatos.js'),
    partidos    = require('./routes/partidos.js'),
    comites     = require('./routes/comites.js'),
    eleicoes    = require('./routes/eleicoes.js'),
    passport    = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    database    = require('./database.js')
   ;

 
var app = express();

//app.configure(function(){
////  //app.use(express.logger('dev'));
//////  app.use(express.bodyParser());
//});

app.use(passport.initialize());

database.connect(function(err) {
  
});

var users = [
{ id: 1, username: 'bob', token: '123456789', email: 'bob@example.com' }
, { id: 2, username: 'joe', token: 'abcdefghi', email: 'joe@example.com' }
];
function findByToken(token, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.token === token) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}


// Use the BearerStrategy within Passport.
// Strategies in Passport require a `validate` function, which accept
// credentials (in this case, a token), and invoke a callback with a user
// object.
passport.use(new BearerStrategy({
  },
  function(token, done) {
    // Find the user by token. If there is no user with the given token, set
    // the user to `false` to indicate failure. Otherwise, return the
    // authenticated `user`. Note that in a production-ready application, one
    // would want to validate the token for authenticity.
    findByToken(token, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));

// curl -v http://127.0.0.1:3000/?access_token=123456789
app.get('/',
  // Authenticate using HTTP Bearer credentials, with session support disabled.
  passport.authenticate('bearer', { session: false }),
  function(req, res){
    res.json({ username: req.user.username, email: req.user.email });
  }
);

app.get('/eleicoes/:id/candidatos',                               candidatos.findAll);
app.get('/eleicoes/:id/candidatos/:cand_id',                      candidatos.findById);
app.get('/eleicoes/:id/candidatos/:cand_id/receitas',             candidatos.receitas);
app.get('/eleicoes/:id/candidatos/:cand_id/receitas/total',       candidatos.receitasTotal);
app.get('/eleicoes/:id/candidatos/:cand_id/despesas',             candidatos.despesas);
app.get('/eleicoes/:id/candidatos/:cand_id/despesas/total',       candidatos.despesasTotal);
app.get('/partidos',                                              partidos.findAll);
app.get('/partidos/:id',                                          partidos.findById);
app.get('/comites',                                               comites.findAll);
app.get('/comites/:id',                                           comites.findById);
app.get('/eleicoes',                                              eleicoes.findAll);
app.get('/eleicoes/:id',                                          eleicoes.findById);

app.listen(3000);
console.log('Listening on port 3000...');

