'use strict'
var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
	clave: 				{ type:String, require:true, unique:true},
	nombre_corto: 		{ type:String, require:true, unique:true},
	nombre_razonsocial:	{ type:String, require:true, unique:true},
	fecha_alta: 		{ type: Date, default: Date.now },
	usuario_alta: 		{ type:String, require:true}
});
var Bill = mongoose.model('bills', billSchema);
module.exports=Bill;