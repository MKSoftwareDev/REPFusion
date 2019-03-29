'use strict'
//models
var Mensaje = require('../../_models/m/mensaje.model');

// add
// upd
// lst
// del
// one

// one
function one_mensaje (req,res){
    var mensaje     =req.params;
    var mensajeid =mensaje.id;
    var mensajeidioma =mensaje.idioma;
    
    if (mensajeid) {
        Mensaje.find({numero:mensaje.id, idioma:mensaje.idioma},(err,mensaje)=>{
            if (err){
                res.status(500).send({messege:err.messege});
            } else {
                if (!mensaje){
                    res.status(404).send({messge:'no se encontro el mensaje'});
                } else {
                    res.status(200).send({mensaje})
                }
            }
        });
    } else {
        res.status(404).send({message:'No se encontro la llave del documento'});
    }
}

module.exports={
    one_mensaje
};