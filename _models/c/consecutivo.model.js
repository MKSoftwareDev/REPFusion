'use strict'
var mongoose = require('mongoose');

var consecutivoSchema = new mongoose.Schema({
    clave:	{type: String,	required: true, unique: true},
	numero:	{type: Number,	required: true},
	prefijo: {type: String, required: true},
	sufijo:{type: String,	required: true},
    soloNumero:	{type: Boolean,	required: true}
});
var Consecutivo = mongoose.model('consecutivos', consecutivoSchema);
module.exports=Consecutivo;