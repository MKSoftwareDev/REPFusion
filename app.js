'use strict'

var express=require('express');
var bodyParser = require('body-parser');
var app=express();
var path = require('path');

// Cargar rutas
//app.use('/',express.static('cliente',{redirect:false}));
var user_routes=require('./_routes/u/user.routes');
var bill_routes=require('./_routes/b/bill.routes');
var empresa_routes=require('./_routes/e/empresa.routes');
var sucursal_routes=require('./_routes/s/sucursal.routes');
var cfg_routes=require('./_routes/c/cfg.routes');
var people_routes=require('./_routes/p/people.routes');

// middleware de body-parse
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Configurar Cabeceras y cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Autorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Ac");
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allo','GET,POST,OPTIONS,PUT,DELETE');
  next();
});


//app.use(express.static(path.join(__dirname,'cliente')));
//  esta
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

//rutas base
//app.get('/',(req,res)=>{	
//  res.send('el servidor esta listo');
//});
//rutas base

//app.get('/probando',(req,res)=>{
//	res.status(200).send({message:'Esta es una prueba'});
//});
//app.post('/probando',(req,res)=>{
//	res.status(200).send({message:'Esta es una prueba'});
//});

const mkappuse='/bkd';
app.use('/',express.static('cliente',{redirect:false}));

app.use(mkappuse,user_routes);
app.use(mkappuse,bill_routes);
app.use(mkappuse,empresa_routes);
app.use(mkappuse,sucursal_routes);
app.use(mkappuse,cfg_routes);
app.use(mkappuse,people_routes);

app.get('*',function(req,res,next){
  res.sendFile(path.resolve('cliente/index.html')); //estas
});

module.exports = app;
