
'use strict'

//Base de Datos
var mongoose=require('mongoose');
var app=require('./app');
var port = process.env.PORT || 8080;
var MKdatabaseName='bonobo';
var MKdatabaseServer='localhost';
var MKdatabasePort='27017';

mongoose.Promise= global.Promise;
//mongodb://myServerAdmin:password@localhost:27017/admin
//mongoose.connect('mongodb://localhost:27017/admin')
mongoose.connect('mongodb://'+MKdatabaseServer+':'+MKdatabasePort+'/'+MKdatabaseName).then(
	() => { console.log('La conexion a la base de datos '+MKdatabaseName+' se ha realizado correctamente...');
	app.listen(port,()=>{
		console.log('El servidor local con NODEJS & Express esta corriendo correctamente')
	}); },
	err => { console.log('Verifique '+MKdatabaseServer+':'+MKdatabasePort+', este Online'); }
);



