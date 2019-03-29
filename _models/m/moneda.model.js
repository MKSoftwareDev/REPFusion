'use  estrict'
var mongoose = require('mongoose');

var monedaSchema = new mongoose.Schema({
    clave : { type: String, required: true, unique: true },
    nombre : {type: String, required:true},    
    
    tipoCambio :{type: NumberLong, required: true},
    
    historico :[{
        fecha : {type: String, required: true},
        usuario : {type: String, required : true},
        tipoCambio :{type: NumberLong, required: true},
    }],

    estatus : {type: String, required: true},
    fechaAlta : {type: Date, default: Date.now, required: true},
    usuarioAlta : {type: String, required: true},
    fechaCambio : {type: String,required: true},
    usuarioCambio : {type: String, required: true}

});

var Moneda = mongosse.model('monedas',monedaSchema);
module.export = Moneda;
