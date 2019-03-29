'use stric'
var mongoose = require('mongoose');

var cfgSchema = new mongoose.Schema({
    empresa:{
        nombre:     { type:String, require:true, unique:true},
        iniciales:  { type:String, require:true, unique:true},
        url:        { type:String, require:true, unique:true},
        correoInfo: { type:String, require:true, unique:true},
        frase:      { type:String, require:true, unique:true},
    },
    backend:{
        url:    { type:String, require:true, unique:true},
    }
});
var Cfg = mongoose.model('cfgs',cfgSchema);
module.exports=Cfg;
