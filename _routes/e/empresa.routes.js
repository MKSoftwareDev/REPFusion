'use strict'
var express=require('express');
var api=express.Router();
//Controlador
var md_auth = require('../../_middlewares/a/authenticate');
var empresaCtlr = require('../../_controllers/e/empresa.controller');

// Rutas
api.post  ('/empresa/new', empresaCtlr.empresa_new);   
api.put   ('/empresa/:id', empresaCtlr.empresa_edit);    
api.get   ('/empresa'    , empresaCtlr.empresa_list);
api.delete('/empresa/:id', empresaCtlr.empresa_delete);     
api.get   ('/empresa/:id', empresaCtlr.empresa_uno);

module.exports = api;
