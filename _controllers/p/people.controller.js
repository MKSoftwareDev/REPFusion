'use strict'

//models
var People = require('../../_models/p/people.model');
var Mensaje = require('../../_models/m/mensaje.model');
var mklog = require ('../../_module/l/log.module');


//INSERTA un documento en la coleccion; Verb http POST
function people_new(req,res){  
    var peoplenueva = new People();
    var params=req.body;
    var mkIdioma="esp";

    if (params.clave && params.nombre){
        peoplenueva.clave = params.clave ,
        peoplenueva.nombre = params.nombre,
        peoplenueva.apellido = params.apellido,
        peoplenueva.sapellido = params.sapellido,
        peoplenueva.RFC = params.RFC,
        peoplenueva.genero = params.genero,
        peoplenueva.esPEP = params.esPEP,
        peoplenueva.domicilio = params.domicilio ,  
        peoplenueva.telefono = params.telefono,
        peoplenueva.correo = params.correo,
        peoplenueva.nacionalidad = params.nacionalidad,
        peoplenueva.fechaCreacion = params.fechaCreacion, 
        peoplenueva.fechaactualizacion = params.fechaactualizacion,
        peoplenueva.estatus = params.estatus,
        peoplenueva._usuario = params._usuario

        peoplenueva.save((err,number) => {
             if (err){
                 console.log(err);
                 res.status(500).send({message:err.message});
             } else {
                 if (!number){
                     Mensaje.find({ numero: 4, idioma:mkIdioma},(err,descripcion)=>{
                         var objDescripcion =descripcion[0];
                         var mkmensaje = objDescripcion.mensaje;     
                         res.status(404).send({message:mkmensaje});                              
                     });
                    
                 } else {
                     res.status(200).send({empresa:number});
                 }
             }
         });
     } else {
         Mensaje.find({ numero: 3, idioma:mkIdioma},(err,descripcion)=>{
             var objDescripcion =descripcion[0];
             var mkmensaje = objDescripcion.mensaje;     
             res.status(404).send({message:mkmensaje});       
         });               
     }
}
//EDITA un documento en la coleccion; Verb http PUT
function people_edit(req,res){
    res.status(200).send({message:'EDITA un documento en la coleccion; Verb http PUT'}); 
}
//BORRA un documento en la coleccion; Verb http DELETE
function people_delete(req,res){
    res.status(200).send({message:'BORRA un documento en la coleccion; Verb http DELETE'});   
}
//ENLISTA TODOS los documentos de la coleccion; verb http GET
function people_all (req,res){
    people.find({},(err,empresa)=>{
        if (err) {
            res.status(500).send({message:err.message});
        } else {
            if (!empresa) {
                res.status(404).send({message:'No se encontraron Registros'});                
            } else {
                res.status(200).send({empresa})
            }
        }
    });
}
//ENLISTA UN documento de la coleccion; verb http GET
function people_one (req,res){
    var peopleid=req.params.id;
    if (peopleid) {
        Empresa.find({_id:peopleid},(err,people)=>{
            if (err){
                res.status(500).send({messege:err.messege});
            } else {
                if (!people){
                    res.status(404).send({messge:'No se encontro el registro'});
                } else {
                    res.status(200).send({people})
                }
            }
        });
    } else {
        res.status(404).send({message:'No se encontro la llave del documento'});
    }
}
module.exports={
    people_new,
    people_edit,
    people_delete,
    people_all,
    people_one
};