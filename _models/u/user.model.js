'use strict'
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	surname:	{type: String,	required: true, unique: true},
	nombre:		{type: String,	required: true},
	paterno:	{type: String,	required: true},
	materno:	String,
	rfc:		{type: String,	required: true, min:9, max:13},
	curp:		{type: String,	required: true, min:9, max:13},	
	password: {type: String, required: true},
	confirmPassword : {type: String,	required: true},
	imagen: String,
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
	correo:		[{
		tipo: String,
		email: String
	}],
	telefono:[{
		tipo: String,
		numero: String,
		extension: String
	}],
	MKdefault:{
		empresa: String,
		sucursal: String,
		almacen: String,
		centroc: String
	},
	grupo: {type: String, default: 'Developers'},
	subgrupo: String,
	departamento: {type: String, default: 'Ventas'},
	accesoEmpresa: [{type: String}],
	accesoSucursal: [{type: String}],
	estatus: {type: String,	required: true, enum: ['ALTA','BAJA','BLOQUEADO','SUSPENDIDO','PENDIENTE']},
	fechaAlta: { type: Date, default: Date.now },
	usuarioAlta : {type: String},
	fechaCambio: { type: Date, default: Date.now },
	usuarioCambio : {type: String}

});
var User = mongoose.model('users', userSchema);
module.exports=User;








