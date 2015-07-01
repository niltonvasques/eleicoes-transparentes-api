var express     = require('express'),
    candidatos  = require('./routes/candidatos.js'),
    partidos    = require('./routes/partidos.js'),
    comites     = require('./routes/comites.js'),
    eleicoes    = require('./routes/eleicoes.js'),
    database    = require('./database.js');

 
var app = express();

//app.configure(function(){
//  app.use(express.logger('dev'));
//  app.use(express.bodyParser());
//});

database.connect(function(err) {
  
});
 
app.get('/eleicoes/:id/candidatos',                         candidatos.findAll);
app.get('/eleicoes/:id/candidatos/:cand_id',                candidatos.findById);
app.get('/eleicoes/:id/candidatos/:cand_id/receitas',            candidatos.receitas);
app.get('/eleicoes/:id/candidatos/:cand_id/receitas/total',      candidatos.receitasTotal);
app.get('/eleicoes/:id/candidatos/:cand_id/despesas',            candidatos.despesas);
app.get('/eleicoes/:id/candidatos/:cand_id/despesas/total',      candidatos.despesasTotal);
app.get('/partidos',                            partidos.findAll);
app.get('/partidos/:id',                        partidos.findById);
app.get('/comites',                             comites.findAll);
app.get('/comites/:id',                         comites.findById);
app.get('/eleicoes',                            eleicoes.findAll);
app.get('/eleicoes/:id',                        eleicoes.findById);
 
app.listen(3000);
console.log('Listening on port 3000...');
