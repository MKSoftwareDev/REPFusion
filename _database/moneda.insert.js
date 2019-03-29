/*
 * Script que se encarga de poblar la base de datos  
 * 
 */
empresa = "MK Software Developers";
mongodb = "bonobo";
//print("********************************************");
print("·.··.·  █ █ █ (  Enterprise:"+ empresa +" Database:"+ mongodb +"...start ) █ █ █  ·.··.·");


//Host donde está nuestra base de datos, no tiene que ser nuestro equipo local, puede ser cualquier mongoDb.
conn = new Mongo("localhost");
//Nombre de la base de datos que vamos a utilizar
db = conn.getDB(mongodb);

/*Limpiamos la base de datos por si existia algo antes*/
//db.collection.drop('monedas');

/* Monedas */
print(" - • = » ‡ « = • - ( Creating Monedas ) - • = » ‡ « = • - ");

/*coleciones de nuestro modelo de datos*/
db.createCollection("monedas",{
	clave:	    	{type: String,	required: true, unique: true},
	nombre:			{type: String,	required: true},
	tipoCambio:		{type: String,	required: true},
	seUsa:			{type: String},
	fechaMod:		{type: Date, default: Date.now,	required: true},
	usuarioMod:		{type: String, required: true}

});

//print("SCRIPT FINISHED");
print("·.··.·  █ █ █ (  Enterprise:"+ empresa +" Database:"+ mongodb +"...finish ) █ █ █  ·.··.·");

