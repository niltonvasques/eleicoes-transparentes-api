var express     = require('express'),
    candidatos  = require('./routes/candidatos.js'),
    partidos    = require('./routes/partidos.js'),
    comites     = require('./routes/comites.js'),
    eleicoes    = require('./routes/eleicoes.js'),
    oauthserver = require('oauth2-server'),
    database    = require('./database.js')
   ;

 
var app = express();

//app.configure(function(){
//  app.use(express.logger('dev'));
//  app.use(express.bodyParser());
//});

database.connect(function(err) {
  
});

app.oauth = oauthserver({
  model: {}, // See below for specification 
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());
app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area');
});
app.get('/eleicoes/:id/candidatos',                               candidatos.findAll);
app.get('/eleicoes/:id/candidatos/:cand_id',                      candidatos.findById);
app.get('/eleicoes/:id/candidatos/:cand_id/receitas',             candidatos.receitas);
app.get('/eleicoes/:id/candidatos/:cand_id/receitas/total',       candidatos.receitasTotal);
app.get('/eleicoes/:id/candidatos/:cand_id/despesas',             candidatos.despesas);
app.get('/eleicoes/:id/candidatos/:cand_id/despesas/total',       candidatos.despesasTotal);
app.get('/partidos',                                              app.oauth.authorise(),  partidos.findAll);
app.get('/partidos/:id',                                          partidos.findById);
app.get('/comites',                                               comites.findAll);
app.get('/comites/:id',                                           comites.findById);
app.get('/eleicoes',                                              eleicoes.findAll);
app.get('/eleicoes/:id',                                          eleicoes.findById);

app.use(app.oauth.errorHandler());
 
app.listen(3000);
console.log('Listening on port 3000...');

