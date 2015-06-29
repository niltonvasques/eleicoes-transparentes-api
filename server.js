var express     = require('express'),
    candidatos  = require('./routes/candidatos.js'),
    partidos    = require('./routes/partidos.js'),
    comites     = require('./routes/comites.js'),
    eleicoes    = require('./routes/eleicoes.js'),
    transacoes  = require('./routes/transacoes.js'),
    database    = require('./database.js');

 
var app = express();

//app.configure(function(){
//  app.use(express.logger('dev'));
//  app.use(express.bodyParser());
//});

database.connect(function(err) {
  
});
 
app.get('/candidatos',                          candidatos.findAll);
app.get('/candidatos/:id',                      candidatos.findById);
app.get('/candidatos/:id/receitas',             candidatos.receitas);
app.get('/candidatos/:id/receitas/total',       candidatos.receitasTotal);
app.get('/candidatos/:id/despesas',             candidatos.despesas);
app.get('/candidatos/:id/despesas/total',       candidatos.despesasTotal);
app.get('/partidos',                            partidos.findAll);
app.get('/partidos/:id',                        partidos.findById);
app.get('/comites',                             comites.findAll);
app.get('/comites/:id',                         comites.findById);
app.get('/eleicoes',                            eleicoes.findAll);
app.get('/eleicoes/:id',                        eleicoes.findById);
app.get('/transacoes',                          transacoes.findAll);
app.get('/transacoes/:id',                      transacoes.findById);
 
app.listen(3000);
console.log('Listening on port 3000...');
