'use strict'

var express=require('express');
var api=express.Router();
//Controlador
var md_auth=require('../../_middlewares/a/authenticate');
var sucursalCtlr=require('../../_controllers/s/sucursal.controller');


// Rutas
api.post  ('/sucursal/new', sucursalCtlr.sucursal_new);   
api.put   ('/sucursal/:id', sucursalCtlr.sucursal_edit);    
api.get   ('/sucursal'    , sucursalCtlr.sucursal_list);
api.delete('/sucursal/:id', sucursalCtlr.sucursal_delete);     
api.get   ('/sucursal/:id', sucursalCtlr.sucursal_uno);

module.exports = api;