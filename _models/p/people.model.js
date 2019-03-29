'use stric'

var mongoose = require('mongoose');
var peopleSchema = new mongoose.Schema({
    people:{
        clave: { type:String, require:true,unique:true},
        nombre: {type:String, require:true,unique:true},
        apellido: {type:String, require:true},
        sapellido: {type:String},
        RFC: {type:String, require:true},
        genero: {type:String, require:true},
        esPEP: {type:Boolean,defauld:true},
        domicilio: [{
                    tipo:  {type:String},
                    direccion:  {type:String},
                    numext:  {type:String},
                    numint: {type:String},
                    cp:  {type:Number},
                    colonia:  {type:String},
                    municipio:  {type:String},
                    delegacion:  {type:String},
                    estado:  {type:String}
                    }],        
        telefono:[{
            tipo: {type:String},
            numero: {type:String},
            extension: {type:String}
        }],
        correo:[{
            tipo: {type:String},
            email: {type:String}
        }],
        nacionalidad:[{
            tipo: {type:String},
            nacionalidad: {type:String}
        }],
        fechaCreacion: {type: Date, default: Date.now, require:true},        
        fechaactualizacion: {type: Date, default: Date.now, require:true},
        estatus: {type: String, enum: ['ALTA','BAJA','BLOQUEADO','SUSPENDIDO'], require:true },
        _usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},       

    }
});

var People = mongoose.model('people',peopleSchema);
module.exports=People;