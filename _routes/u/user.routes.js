'use strict'

var express=require('express');
var UserController=require('../../_controllers/u/user.controller');

var api= express.Router();
var md_auth=require('../../_middlewares/a/authenticate');

api.get   ('/pruebas'    ,md_auth.ensureAuth, UserController.pruebas);
api.post  ('/register'   , UserController.saveUser);
api.post  ('/login'      , UserController.login);
api.post  ('/user/new', UserController.saveUser);   
api.put   ('/user/:id', UserController.user_edit);    
api.get   ('/user'    , UserController.user_list);
api.delete('/user/:id', UserController.user_delete);     
api.get   ('/user/:id', UserController.user_uno);
module.exports = api;