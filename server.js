var express     = require('express'),
    db          = require('./db'),
    candidatos  = require('./routes/candidatos.js'),
    partidos    = require('./routes/partidos.js'),
    comites     = require('./routes/comites.js'),
    eleicoes    = require('./routes/eleicoes.js'),
    passport    = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    database    = require('./database.js'),
    utils       = require('./utils.js')
   ;

 
var app = express();

app.use(passport.initialize());

database.connect(function(err) {
  
});

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
    db.users.findByToken(token, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));

// curl -v http://127.0.0.1:3000/?access_token=123456789
//app.get('/',
//  // Authenticate using HTTP Bearer credentials, with session support disabled.
//  passport.authenticate('bearer', { session: false }),
//  function(req, res){
//    res.json({ email: req.user.email });
//  }
//);

app.get('/', function (req, res){
	res.send('Eleições Transparentes API v0.1');
});

app.get('/api/eleicao/:id/candidatos', 
    passport.authenticate('bearer', { session: false }), candidatos.findAll);
app.get('/api/eleicao/:id/candidato/:cand_id', 
    passport.authenticate('bearer', { session: false }), candidatos.findById);
app.get('/api/eleicao/:id/candidato/:cand_id/receitas', 
    passport.authenticate('bearer', { session: false }), candidatos.receitas);
app.get('/api/eleicao/:id/candidato/:cand_id/receitas/total', 
    passport.authenticate('bearer', { session: false }), candidatos.receitasTotal);
app.get('/api/eleicao/:id/candidato/:cand_id/despesas', 
    passport.authenticate('bearer', { session: false }), candidatos.despesas);
app.get('/api/eleicao/:id/candidato/:cand_id/despesas/total', 
    passport.authenticate('bearer', { session: false }), candidatos.despesasTotal);
app.get('/api/partidos', 
    passport.authenticate('bearer', { session: false }), partidos.findAll);
app.get('/api/partido/:id', 
    passport.authenticate('bearer', { session: false }), partidos.findById);
app.get('/api/eleicao/:id/partidos/receitas/total', 
    passport.authenticate('bearer', { session: false }), partidos.allReceitasTotal);
app.get('/api/eleicao/:id/partidos/despesas/total', 
    passport.authenticate('bearer', { session: false }), partidos.allDespesasTotal);
app.get('/api/eleicao/:id/partido/:p_id/receitas', 
    passport.authenticate('bearer', { session: false }), partidos.receitas);
app.get('/api/eleicao/:id/partido/:p_id/receitas/total', 
    passport.authenticate('bearer', { session: false }), partidos.receitasTotal);
app.get('/api/eleicao/:id/partido/:p_id/despesas', 
    passport.authenticate('bearer', { session: false }), partidos.despesas);
app.get('/api/eleicao/:id/partido/:p_id/despesas/total', 
    passport.authenticate('bearer', { session: false }), partidos.despesasTotal);
app.get('/api/comites', 
    passport.authenticate('bearer', { session: false }), comites.findAll);
app.get('/api/comite/:id', 
    passport.authenticate('bearer', { session: false }), comites.findById);
app.get('/api/eleicoes', 
    passport.authenticate('bearer', { session: false }), eleicoes.findAll);
app.get('/api/eleicao/:id', 
    passport.authenticate('bearer', { session: false }), eleicoes.findById);
app.get('/api/eleicao/:id/ranking_doadores_pj', 
    passport.authenticate('bearer', { session: false }), eleicoes.rankingDoadoresPJ);

app.listen(3000);
console.log('Listening on port 3000...');

