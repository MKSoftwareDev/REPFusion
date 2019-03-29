'use strict'

var express=require('express');
var api=express.Router();
//Controlador
var md_auth=require('../../_middlewares/a/authenticate');
var peopleCtlr=require('../../_controllers/p/people.controller');

// Rutas
api.post ('/people/new',peopleCtlr.people_new);
api.get ('/people',peopleCtlr.people_all);
api.get ('/people/:_id',peopleCtlr.people_one);
api.delete ('/people/del/:_id',peopleCtlr.people_delete);
api.put ('/people/:_id',peopleCtlr.people_edit);

module.exports = api;