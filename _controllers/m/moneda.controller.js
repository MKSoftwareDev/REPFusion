'use strict'

var Moneda = require('../../_models/m/moneda.model');
var Mensaje = require ('../../_models/m/mensaje.model');

function moneda_new(req,res){
    var moneda= new Moneda();
    var params=req.body;
    var mkidioma='esp';
    
    if (params.clave && params.nombre ) {
        moneda.clave=params.clave;
        moneda.nombre=params.nombre;
        moneda.tipoCambio=params.tipoCambio;
        moneda.historico=params.historico;
        moneda.fechaAlta=date.now();
        moneda.usuarioAlta=params.usuario;
        moneda.fechaCambio=date.now();
        moneda.usuarioCambio=params.usuario;

        moneda.save((err,monedanew)=>{
            if (err){
                console.log(err);
                Mensaje.find({ numero:0, idioma:mkidioma},(err,msj)=>{
                    var objmsj=msj[0];
                    var mkmsj=objmsj.mensaje +", err: "+ err.message;
                    res.estatus(500).send({message:mkmsj});  
                });          
            } else {
                if (!monedanew){
                    Mensaje.find({ numero:1, idioma:mkidioma},(err,msj)=>{
                        var objmsj=msj[0];
                        var mkmsj=objmsj.mensaje;
                        res.estatus(404).send({message:mkmsj});
                    });
                } else {
                    res.status(200).send({empresa:monedanew});
                }
            }
        });

    } else {
        Mensaje.find({ numero:2, idioma:mkidioma},(err,msj)=>{
            var objmsj=msj[0];
            var mkmsj=objmsj.mensaje;
            res.estatus(404).send({message:mkmsj});
        });
    }
}


function moneda_edit(req,res){
    var monedaid=req.params.id;  
    var moneda = new Moneda();
    var params=req.body;
    var mkIdioma="esp";
	if (monedaid){
		var params=req.body;
		if ( params.clave && params.nombre ){
			Moneda.findByIdAndUpdate(monedaid,
				                  {$set : {
                                    clave=params.clave,
                                    nombre=params.nombre,
                                    tipoCambio=params.tipoCambio,
                                    historico=params.historico,
                                    fechaCambio=date.now(),
                                    usuarioCambio=params.usuario,     
									}},{ upsert:true, new : true }, (err,monedaUpt) => {
				if (err) {
                    console.log(err);
                    Mensaje.find({ numero:0, idioma:mkidioma},(err,msj)=>{
                        var objmsj=msj[0];
                        var mkmsj=objmsj.mensaje +", err: "+ err.message;
                        res.estatus(500).send({message:mkmsj});  
                    });     
				}else{
					if (!monedaUpt) {
                        Mensaje.find({ numero:1, idioma:mkidioma},(err,msj)=>{
                            var objmsj=msj[0];
                            var mkmsj=objmsj.mensaje;
                            res.estatus(404).send({message:mkmsj});
                        });
					}else{
						res.status(200).send({moneda:monedaUpt});
					}
				}
			});
		}else{
            Mensaje.find({ numero:2, idioma:mkidioma},(err,msj)=>{
                var objmsj=msj[0];
                var mkmsj=objmsj.mensaje;
                res.estatus(404).send({message:mkmsj});
            });
		}

	}else{
        Mensaje.find({ numero:3, idioma:mkidioma},(err,msj)=>{
            var objmsj=msj[0];
            var mkmsj=objmsj.mensaje;
            res.estatus(404).send({message:mkmsj});
        });
	}
}
function moneda_list(req,res){
    Moneda.find({},(err,moneda)=>{
        if (err) {
            console.log(err);
            Mensaje.find({ numero:0, idioma:mkidioma},(err,msj)=>{
                var objmsj=msj[0];
                var mkmsj=objmsj.mensaje +", err: "+ err.message;
                res.estatus(500).send({message:mkmsj});  
            });
        } else {
            if (!empresa) {
                Mensaje.find({ numero:3, idioma:mkidioma},(err,msj)=>{
                    var objmsj=msj[0];
                    var mkmsj=objmsj.mensaje;
                    res.estatus(404).send({message:mkmsj});
                });                
            } else {
                res.status(200).send({moneda})
            }
        }
    });
}
function moneda_delete(req,res){
    var monedaId=req.params.id;
	if (!monedaId) {	
		Moneda.findByIdAndRemove(monedaId,(err,moneda)=>{
			if(err){
                Mensaje.find({ numero:0, idioma:mkidioma},(err,msj)=>{
                    var objmsj=msj[0];
                    var mkmsj=objmsj.mensaje +", err: "+ err.message;
                    res.estatus(500).send({message:mkmsj});  
                });
			}else{
				if(!moneda){
                    Mensaje.find({ numero:1, idioma:mkidioma},(err,msj)=>{
                        var objmsj=msj[0];
                        var mkmsj=objmsj.mensaje;
                        res.estatus(404).send({message:mkmsj});
                    });

				}else{
					res.status(200).send({moneda})
				}
			}
		});
	}else{
        Mensaje.find({ numero:3, idioma:mkidioma},(err,msj)=>{
            var objmsj=msj[0];
            var mkmsj=objmsj.mensaje;
            res.estatus(404).send({message:mkmsj});
        });
	}
}
function moneda_uno(req,res){
    var monedaid=req.params.id;
    if (monedaid) {
        Moneda.find({_id:monedaid},(err,moneda)=>{
            if (err){
                Mensaje.find({ numero:0, idioma:mkidioma},(err,msj)=>{
                    var objmsj=msj[0];
                    var mkmsj=objmsj.mensaje +", err: "+ err.message;
                    res.estatus(500).send({message:mkmsj});  
                });
            } else {
                if (!moneda){
                    Mensaje.find({ numero:1, idioma:mkidioma},(err,msj)=>{
                        var objmsj=msj[0];
                        var mkmsj=objmsj.mensaje;
                        res.estatus(404).send({message:mkmsj});
                    });
                } else {
                      //console.log(JSON.stringify(empresa));
                    res.status(200).send({moneda})                    
                }
            }
        });
    } else {
        Mensaje.find({ numero:3, idioma:mkidioma},(err,msj)=>{
            var objmsj=msj[0];
            var mkmsj=objmsj.mensaje;
            res.estatus(404).send({message:mkmsj});
        });
    }
}
module.exports={
    moneda_new,
    moneda_edit,
    moneda_list,
    moneda_delete,
    moneda_uno,
}