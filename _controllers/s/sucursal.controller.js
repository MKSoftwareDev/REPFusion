'use strict'
//models
var Sucursal = require('../../_models/s/sucursal.model');
var Mensaje = require('../../_models/m/mensaje.model');
var mklog = require ('../../_module/l/log.module');

//insertar
function sucursal_new (req,res){
    //var hoy = new Date();
    var sucursal = new Sucursal();
    var params=req.body;
    var mkIdioma="esp";
    //console.log(params);
    if (params.clave && params.nombre){
        //asignamos las variables
        sucursal.clave=params.clave;
        sucursal.nombre=params.nombre;
        sucursal.empresa=params.empresa;
        sucursal.rfc=params.rfc;
        sucursal.grupo=params.grupo;
        sucursal.estatus=params.estatus;
        sucursal.fechaAlta=params.fechaAlta;
        sucursal.seBorra=params.seBorra;
        sucursal.cveUsuarioAlta=params.cveUsuarioAlta;       

        sucursal.save((err,number) => {
            if (err){
                res.status(500).send({message:err.message});
            } else {
                if (!number){
                    Mensaje.find({ numero: 4, idioma:mkIdioma},(err,descripcion)=>{
                        var objDescripcion =descripcion[0];
                        var mkmensaje = objDescripcion.mensaje;     
                        res.status(404).send({message:mkmensaje});                              
                    });
                } else {
                    res.status(200).send({sucursal:number});
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
//  Actualizar
function sucursal_edit (req,res){
	var sucursalid=req.params.id;
    var mkIdioma="esp";
    var sucursal = new Sucursal();
    var params=req.body;
    
	if (sucursalid){
		//recoger parametros peticion
		var params=req.body;
		//console.log(params);
		if ( params.clave && params.nombre ){

			Sucursal.findByIdAndUpdate(sucursalid,
				                  {$set : {clave:params.clave,
									       nombre:params.nombre,
                                           rfc:params.rfc,
                                           grupo:params.grupo,
                                           estatus:params.estatus,
                                           seBorra:params.seBorra,
                                           
                                           domicilio:params.domicilio,
                                           telefono:params.telefono
									}},{ upsert:true, new : true }, (err,sucursalUpt) => {
				if (err) {
					res.status(500).send({message:err.message});
				}else{
					if (!sucursalUpt) {
						res.status(404).send({message:'Error al actualizar la sucursal'});
					}else{
						res.status(200).send({sucursal:sucursalUpt});
					}
				}
			});
		}else{
			res.status(404).send({message:'Introduce correctamente los datos'});
		}

	}else{
		res.status(404).send({message:'No se encontro el ID en la Rutaaaaaaaaaaaaa'});
	}
}
//  Lista
function sucursal_list (req,res){
    Sucursal.find({},(err,sucursal)=>{
        if (err) {
            res.status(500).send({messege:err.messege});
        } else {
            if (!sucursal) {
                res.status(404).send({message:'No se encontraron Registros'})
            } else {
                res.status(200).send({sucursal})
            }            
        }
    });
}
//	Borrar
function sucursal_delete (req,res){
	var sucursalId=req.params.id;
	if (!empresaId) {	
		sucursal.findByIdAndRemove(sucursalId,(err,empresa)=>{
			if(err){
				res.status(500).send({message:err.message});
			}else{
				if(!empresa){
					res.status(404).send({message:'No se encontro el registro'});

				}else{
					res.status(200).send({empresa})
				}
			}
		});
	}else{
		res.status(404).send({message:'No se encontro la llave del documento'});
	}
}
// detalle
function sucursal_uno (req,res){
    var sucursalid=req.params.id;
    if (sucursalid) {
        Sucursal.find({_id:sucursalid},(err,sucursal)=>{
            if (err){
                res.status(500).send({messege:err.messege});
            } else {
                if (!sucursal){
                    res.status(404).send({messge:'No se encontro el registro'});
                } else {
                    res.status(200).send({sucursal})
                }
            }
        });
    } else {
        res.status(404).send({message:'No se encontro la llave del documento'});
    }
}

module.exports ={
    sucursal_new,
    sucursal_edit,
    sucursal_list,
    sucursal_delete,
    sucursal_uno
};
