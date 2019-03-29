'use strict'
//models
var Empresa = require('../../_models/e/empresa.model');
var Mensaje = require('../../_models/m/mensaje.model');
var mklog = require ('../../_module/l/log.module');
// Insertar
function empresa_new(req,res){  
    //crear el objeto de la empresa
    var empresa = new Empresa();
    //recoger parametros de peticion
    var params=req.body;
    var mkIdioma="esp";
    console.log(req.body);
    //console.log(params);
    //
     if (params.clave && params.nombre){
         //asignamos las variables
         empresa.clave=params.clave;
         empresa.nombre=params.nombre;
         empresa.rfc=params.rfc;
         empresa.grupo=params.grupo;
         empresa.estatus=params.estatus;
         empresa.fechaAlta=params.fechaAlta;
         empresa.seBorra=params.seBorra;
         empresa.cveUsuarioAlta=params.cveUsuarioAlta;
         
         //console.log(empresa);
         empresa.save((err,number) => {
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
//  Actualizar
function empresa_edit (req,res){
	var empresaid=req.params.id;
    console.log(empresaid);
      
    //crear el objeto de la empresa
    var empresa = new Empresa();
    //recoger parametros de peticion
    var params=req.body;
    var mkIdioma="esp";
    console.log(req.body);
	if (empresaid){
		//recoger parametros peticion
		var params=req.body;
		console.log(params);
		if ( params.clave && params.nombre ){

			Empresa.findByIdAndUpdate(empresaid,
				                  {$set : {clave:params.clave,
									       nombre:params.nombre,
                                           rfc:params.rfc,
                                           grupo:params.grupo,
                                           estatus:params.estatus,
                                           seBorra:params.seBorra,                                          
                                           domicilio:params.domicilio,
                                           telefono:params.telefono
									}},{ upsert:true, new : true }, (err,empresaUpt) => {
				if (err) {
					res.status(500).send({message:err.message});
				}else{
					if (!empresaUpt) {
						res.status(404).send({message:'Error al actualizar la empresa'});
					}else{
						res.status(200).send({empresa:empresaUpt});
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
function empresa_list (req,res){
    Empresa.find({},(err,empresa)=>{
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
//	Borrar
function empresa_delete (req,res){
	var empresaId=req.params.id;
	if (!empresaId) {	
		Empresa.findByIdAndRemove(empresaId,(err,empresa)=>{
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

//  Detalle
function empresa_uno (req,res){
    var empresaid=req.params.id;
    if (empresaid) {
        Empresa.find({_id:empresaid},(err,empresa)=>{
            if (err){
                res.status(500).send({messege:err.messege});
            } else {
                if (!empresa){

                    res.status(404).send({messge:'No se encontro el registro'});
                } else {
                    //if ( empresa.hasOwnProperty( seBorra ) || ( empresa.seBorra !== true ) ) {
                      //     empresa.seBorra=false;
                      console.log(JSON.stringify(empresa));
                            res.status(200).send({empresa})
                      // };
                    
                }
            }
        });
    } else {
        res.status(404).send({message:'No se encontro la llave del documento'});
    }
}


module.exports={
    empresa_new,
    empresa_edit,
    empresa_list,
    empresa_delete,
    empresa_uno
};