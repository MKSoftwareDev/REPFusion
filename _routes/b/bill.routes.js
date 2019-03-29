'use strict'

var express=require('express');
var api= express.Router();
//Controlador
var md_auth     =require('../../_middlewares/a/authenticate');
var billCtlr    =require('../../_controllers/b/bill.controller');
// Rutas
api.post  ('/bill/new',     md_auth.ensureAuth,billCtlr.bill_new_post);     //OK 
api.delete('/bill/del/:id', md_auth.ensureAuth,billCtlr.bill_del_delete);   //OK
api.put   ('/bill/upt/:id', md_auth.ensureAuth,billCtlr.bill_upt_put);      //
api.get   ('/bill/:id',     md_auth.ensureAuth,billCtlr.bill_det);
api.get   ('/bill',         md_auth.ensureAuth,billCtlr.bill_lst);

module.exports = api;