'use strict'
//Models
var Bill=require('../../_models/b/bill.model');

//	Nuevo
function bill_new_post (req,res){	
	//crear el objeto del usuario
	var bill = new Bill();
	//recoger parametros peticion
	var params=req.body;
	//console.log(params);
	if ( params.clave && params.nombre_corto && params.nombre_razonsocial ){
		//asignamos las variables
		bill.clave=params.clave;
		bill.nombre_corto=params.nombre_corto;
		bill.nombre_razonsocial=params.nombre_razonsocial;
		bill.usuario_alta='Mexico';

		bill.save((err,number) => {
			if (err) {
				res.status(500).send({message:err.message});
			}else{
				if (!number) {
					res.status(404).send({message:'Error al insertar la cuenta'});
				}else{
					res.status(200).send({bill:number});
				}
			}
		});
	}else{
		res.status(404).send({message:'Introduce correctamente los datos'});
	}
}
//	Borrar
function bill_del_delete (req,res){
	var billId=req.params.id;
	if (!billId) {	
		Bill.findByIdAndRemove(billId,(err,bill)=>{
			if(err){
				res.status(500).send({message:err.message});
			}else{
				if(!bill){
					res.status(404).send({message:'No se encontro el registro'});

				}else{
					res.status(200).send({bill})
				}
			}
		});
	}else{
		res.status(404).send({message:'No se encontro la llave del documento'});
	}
}
//	Actualizar
function bill_upt_put (req,res){
	var billid=req.params.id;
	console.log(billid);
	if (billid){
		//recoger parametros peticion
		var params=req.body;
		//console.log(params);
		if ( params.clave && params.nombre_corto && params.nombre_razonsocial ){

			Bill.findByIdAndUpdate(billid,
				                  {$set : {clave:params.clave,
									  nombre_corto:params.nombre_corto,
									  nombre_razonsocial:params.nombre_razonsocial
									}},{ upsert:true, new : true }, (err,billUpt) => {
				if (err) {
					res.status(500).send({message:err.message});
				}else{
					if (!billUpt) {
						res.status(404).send({message:'Error al insertar la cuenta'});
					}else{
						res.status(200).send({bill:billUpt});
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
//	Detalle
function bill_det (req,res){
	var billId=req.params.id;
	if (billId) {	
		Bill.find({_id:billId},(err,bill)=>{
			if(err){
				res.status(500).send({message:err.message});
			}else{
				if(!bill){
					res.status(404).send({message:'No se encontro el registro'});

				}else{
					res.status(200).send({bill})
				}
			}
		});
	}else{
		res.status(404).send({message:'No se encontro la llave del documento'});
	}
}
// Lista
function bill_lst (req,res){	
	Bill.find({},(err,bill)=>{
		if(err){
			res.status(500).send({message:err.message});
		}else{
			if(!bill){
				res.status(404).send({message:'No se encontro el registro'});

			}else{
				res.status(200).send({bill})
			}
		}
	});
}

module.exports= {
	bill_new_post,
	bill_del_delete,
	bill_upt_put,
	bill_det,
	bill_lst
};