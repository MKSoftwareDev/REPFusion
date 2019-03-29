'use strict'
var mongoose= require('mongoose');

var mensajeSchema = new mongoose.Schema({
    numero: {type: Number, require},
    idioma: {type: String, require},
    mensaje: {type: String, require},
    tipo: { type: String,require}
});
var Mensaje = mongoose.model('mensajes', mensajeSchema);
module.exports=Mensaje;

