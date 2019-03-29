'use strict'
var mongoose = require('mongoose');

var sucursalSchema = new mongoose.Schema({
	clave:	{type: String,	required: true, unique: true},
	nombre:	{type: String,	required: true},
	rfc:	{type: String,	required: true, min:9, max:13},
	empresa:  {type: String, default: 'DEMO'},
	grupo:  {type: String, default: 'PRINCIPAL'},
	seBorra: Boolean,
	estatus: {type: String, required: true},
	fechaAlta: { type: Date, default: Date.now },
	cveUsuarioAlta :	{type: String},
	domicilio: [{
				tipo: String,
				direccion: String,
				numext: String,
				numint: String,
				cp: Number,
				colonia: String,
				municipio: String,
				delegacion: String,
				estado: String
	}],
	telefono:[{
				tipo: String,
				numero: String,
				extension: String
	}],		

});
var Sucursal = mongoose.model('sucursales', sucursalSchema);
module.exports=Sucursal;