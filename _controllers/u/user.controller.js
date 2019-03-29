'use strict'

//modulos
var bcrypt=require('bcrypt-nodejs');
//modelos
var User=require('../../_models/u/user.model');
//servicio jwt
var jwt=require('../../_services/j/jwt');

//acciones
function pruebas(req,res){
	res.status(200).send({
		message:'probando el controlador de usuarios y la accion de pruebas',
		user: req.user
	});
}

function saveUser(req,res){
	//crear el objeto del usuario
	var user = new User();	
	//recoger parametros peticion
	var params=req.body;
	
	if ( params.nombre && params.surname ){
		user.surname=params.surname;
		user.nombre=params.nombre;
		user.paterno=params.paterno;
		user.materno=params.materno;
		user.rfc=params.rfc;
		user.curp=params.curp;		
		//user.email=params.email;
		user.password=params.password;
		//user.role='Admin';
		//user.imagen=null;
		User.findOne({surname:user.surname.toLowerCase()},(err,findUser)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar el usuario'})
			}else{
				if(!findUser){
					//cifrar la contraseña
					//bcrypt.hash (params.password,null,null,function(err,hash){
					//	user.password=hash;

						user.save((err,userStored)=>{
							if (err){
								res.status(500).send({message: err.message});								
							
							}else{
								if(!userStored){
									res.status(404).send({message:'No se ha registrado el usuario'});
								}else{
									res.status(200).send({user:userStored});
								}
							}
						});
					//});

				}else{
					res.status(404).send({message:'El usuario ya esta registrado'});
				}
			}
		})
	}else{
		res.status(200).send({message:'introduce los datos correctamente para '});
	}

}

function login(req,res){
	//console.log(req.body);
	//console.log(params);
	
	var params = req.body;
	//var email=params.email;
	//console.log(params);
	var surname = params.surname;
	var password = params.password;
	var empresa = params.empresa;
	var sucursal = params.sucursal;
	var fechatrabajo = params.fechatrabajo;

	//if (empresa == ""){
	//	console.log(params);
	//}

	User.findOne({surname:surname,},(err,user)=>{
		if(err){
			res.status(500).send({message:'Error al comprobar el usuario'})
			//console.log('Error al comprobar el usuario');
		}else{
			if(user){
				//cifrar la contraseña
				//res.status(200).send({findUser})
				bcrypt.compare(password,user.password,(err,check)=>{
					if(check){
						//res.status(200).send({findUser});						
						if(params.gettoken){
							//devolver el token

							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							//Verificamos si tiene acceso a la empresa
							//console.log(user.accesoEmpresa);
							//console.log(empresa);
							//console.log(user.accesoSucursal);
							//console.log(sucursal);
							if (user.accesoEmpresa.indexOf(empresa) === -1) {
								res.status(404).send({message:'No tiene acceso a la empresa ' + empresa });
								//console.log('No tiene acceso empresa ' + empresa);
							} else if (user.accesoEmpresa.indexOf(empresa) > -1) {
								//Verificamos si tiene acceso a la sucursal
								if (user.accesoSucursal.indexOf(sucursal) === -1) {
									res.status(404).send({message:'No tiene acceso a la sucursal ' + sucursal });
									//console.log('No tiene acceso sucursal ' + sucursal);
								} else if (user.accesoSucursal.indexOf(sucursal) > -1) {
									res.status(200).send({user});							
									console.log('shalom');
								}
							}
						}
					}else{
						res.status(404).send({message:'El password es incorrecto'});
						//console.log('El password es incorrecto');
					}
				});

			}else{
				res.status(404).send({message:'El usuario no se encuentra registrado'});
				//console.log('El usuario no se encuentra registrado');
			}
		}
	})
}

// Insertar
function user_new(req,res){  
    //crear el objeto de la empresa
    var user = new User();
    //recoger parametros de peticion
    var params=req.body;
    var mkIdioma="esp";
    //console.log(req.body);
    //console.log(params);
    //
     if (params.surname && params.nombre){
         //asignamos las variables
         user.surname=params.surname;
         user.nombre=params.nombre;
                 
         //console.log(empresa);
         user.save((err,number) => {
             if (err){
                 //console.log(err);
                 res.status(500).send({message:err.message});
             } else {
                 if (!number){
                     Mensaje.find({ numero: 4, idioma:mkIdioma},(err,descripcion)=>{
                         var objDescripcion =descripcion[0];
                         var mkmensaje = objDescripcion.mensaje;     
                         res.status(404).send({message:mkmensaje});                              
                     });
                    
                 } else {
                     res.status(200).send({user:number});
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
function user_edit (req,res){
	var userid=req.params.id;
    //console.log(userid);
      
    //crear el objeto de la empresa
    var user = new User();
    //recoger parametros de peticion
    var params=req.body;
    var mkIdioma="esp";
    //console.log(req.body);
	if (userid){
		//recoger parametros peticion
		var params=req.body;
		//console.log(params);
		if ( params.surname && params.nombre ){

			User.findByIdAndUpdate(userid,
				                  {$set : {surname:params.surname,
									       nombre:params.nombre                                           
									}},{ upsert:true, new : true }, (err,userUpt) => {
				if (err) {
					res.status(500).send({message:err.message});
				}else{
					if (!userUpt) {
						res.status(404).send({message:'Error al actualizar la usuario'});
					}else{
						res.status(200).send({user:userUpt});
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
function user_list (req,res){
    User.find({},(err,user)=>{
        if (err) {
            res.status(500).send({message:err.message});
        } else {
            if (!user) {
                res.status(404).send({message:'No se encontraron Registros'});                
            } else {
                res.status(200).send({user})
            }
        }
    });
}
//	Borrar
function user_delete (req,res){
	var userId=req.params.id;
	if (!userId) {	
		User.findByIdAndRemove(userId,(err,user)=>{
			if(err){
				res.status(500).send({message:err.message});
			}else{
				if(!user){
					res.status(404).send({message:'No se encontro el registro'});

				}else{
					res.status(200).send({user})
				}
			}
		});
	}else{
		res.status(404).send({message:'No se encontro la llave del documento'});
	}
}

//  Detalle
function user_uno (req,res){
    var userid=req.params.id;
    if (userid) {
        User.find({_id:userid},(err,user)=>{
            if (err){
                res.status(500).send({messege:err.messege});
            } else {
                if (!user){
                    res.status(404).send({messge:'No se encontro el registro'});
                } else {
                    res.status(200).send({user})
                }
            }
        });
    } else {
        res.status(404).send({message:'No se encontro la llave del documento'});
    }
}




	//para probar
	//res.status(200).send({
	//	message:'Metodo de registro'
	//});
module.exports= {
	pruebas,
	saveUser,
	login,
	user_new,
    user_edit,
    user_list,
    user_delete,
    user_uno
};