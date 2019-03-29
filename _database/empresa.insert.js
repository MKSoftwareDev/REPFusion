empresa = "MK Software Developers";
mongodb = "bonobo";
print("·.··.·  █ █ █ (  Enterprise:"+ empresa +" Database:"+ mongodb +"...start ) █ █ █  ·.··.·");

//Host donde está nuestra base de datos, no tiene que ser nuestro equipo local, puede ser cualquier mongoDb.
conn = new Mongo("localhost");
//Nombre de la base de datos que vamos a utilizar
db = conn.getDB(mongodb);

/*Limpiamos la base de datos por si existia algo antes*/
db.dropDatabase();

/* Usuarios */
print(" - • = » ‡ « = • - ( Creating Users ) - • = » ‡ « = • - ");

/*coleciones de nuestro modelo de datos*/
db.createCollection("users",{
	surname:	{type: String,	required: true, unique: true},
	nombre:		{type: String,	required: true},
	paterno:	{type: String,	required: true},
	materno:	String,
	rfc:		{type: String,	required: true, min:9, max:13},
	curp:		{type: String,	required: true, min:9, max:13},	
	password: {type: String, required: true},
	confirmPassword : {type: String,	required: true},
	imagen: String,
	domicilio: [{
		tipo: String,
		direccion: String,
		numext: String,
		numint: String,
		cp: Number,
		colonia: String,
		municipio: String,
		delegacion: String,
		estado: String
	}],
	correo:		[{
		tipo: String,
		email: String
	}],
	telefono:[{
		tipo: String,
		numero: String,
		extension: String
	}],
	MKdefault:{
		empresa: String, default: 'DEMO',
		sucursal: String, default: 'CDMX',
		almacen: String,
		centroc: String
	},
	grupo: {type: String, default: 'Desarrollo'},
	subgrupo: String,
	departamento: {type: String, default: 'Sistemas'},
	accesoEmpresa: [{type: String}],
	accesoSucursal: [{type: String}],
	estatus: {type: String,	required: true, enum: ['ALTA','BAJA','BLOQUEADO','SUSPENDIDO','PENDIENTE']},
	fechaAlta: { type: Date, default: Date.now },
	usuarioAlta : {type: String},
	fechaCambio: { type: Date, default: Date.now },
	usuarioCambio : {type: String}

});

db.users.createIndex( { "surname": 1 }, { unique: true } );

//mexico2018
db.users.save({
    "surname":	"HROSALES",
	"nombre":		"Hector",
	"paterno":	"Rosales",
	"materno":	"Ortiz",
	"rfc":		"XAXX010101000",
	"curp":		"XAXX010101000",
	"password": "$2a$10$lDV18lVYQtOigd3v/vQuZOBOc0Qo2FiyyQOPIHnYMODQCGXfkggwS",
	"confirmPassword" :"$2a$10$lDV18lVYQtOigd3v/vQuZOBOc0Qo2FiyyQOPIHnYMODQCGXfkggwS",
	"imagen": "",
	"domicilio": [],
	"correo":		[],
	"telefono":[],
	"MKdefault":{
		"empresa": "DEMO",
		"sucursal": "CDMX",
		"almacen": "ALM-PASO",
		"centroc": "CC001"
	},
	"grupo": {type: String, default: 'Desarrollo'},
	"subgrupo": String,
	"departamento": "Sistemas",
	"accesoEmpresa": ["DEMO"],
	"accesoSucursal": ["CDMX"],
	"estatus": "ALTA",
	"fechaAlta": Date("22/10/2018") ,
	"usuarioAlta" : "HROSALES",
	"fechaCambio": Date("22/10/2018"),
    "usuarioCambio" : "HROSALES"
});

/* Empresas */
print(" - • = » ‡ « = • - ( Creating Enterprise ) - • = » ‡ « = • - ");
/*coleciones de nuestro modelo de datos*/
db.createCollection("empresas",{
	clave:	{type: String,	required: true, unique: true},
	nombre:	{type: String,	required: true},
	rfc:	{type: String, default: 'XAXX010101000',	required: true, min:9, max:13},
	grupo:  {type: String, default: 'PENDIENTE'},
	seBorra: {type: Boolean, default: false},
	estatus: {type: String, enum: ['ALTA','BAJA','BLOQUEADO','SUSPENDIDO','PENDIENTE'] },
	fechaAlta: { type: Date, default: Date.now },
	cveUsuarioAlta : {type: String},
	domicilio: [{
				tipo: String,
				direccion: String,
				numext: String,
				numint: String,
				cp: Number,
				colonia: String,
				municipio: String,
				delegacion: String,
				estado: String
	}],
	telefono:[{
				tipo: String,
				numero: String,
				extension: String
	}],	

});

db.empresas.save({ 
    "clave" : "DEMO",
    "nombre" : "Empresa de demostración",
    "rfc" : "XAXX010101000",
    "grupo" : "PRINCIPAL",
    "seBorra": true,
	"estatus" : "ALTA",	
	"fechaAlta": Date("22/10/2018"),
	"cveUsuarioAlta":"HROSALES",
    "domicilio" : [ 
        {
            "tipo" : "Principal",
            "direccion" : "Mariquita Linda",
            "numext" : "461",
            "numint" : "",
            "cp" : "57000",
            "colonia" : "Benito Juarez",
            "municipio" : "Nezahualcoyotl",
            "delegacion" : "",
            "estado" : "Estado de Mexico"
        }
    ],
    "telefono" : [ 
        {
            "tipo" : "Principal",
            "numero" : "5557302122",
            "extension" : ""
        }
    ],

});



/* Sucursales */
print(" - • = » ‡ « = • - ( Creating Branch ) - • = » ‡ « = • - ");
/*coleciones de nuestro modelo de datos*/
db.createCollection("sucursales",{
        clave:	{type: String,	required: true, unique: true},
        nombre:	{type: String,	required: true},
        rfc:	{type: String,	required: true, min:9, max:13},
        empresa:  {type: String, default: 'DEMO'},
        grupo:  {type: String, default: 'PRINCIPAL'},
        seBorra: Boolean,
        estatus: {type: String, required: true},
        fechaAlta: { type: Date, default: Date.now },
        cveUsuarioAlta :	{type: String},
        domicilio: [{
                    tipo: String,
                    direccion: String,
                    numext: String,
                    numint: String,
                    cp: Number,
                    colonia: String,
                    municipio: String,
                    delegacion: String,
                    estado: String
        }],
        telefono:[{
                    tipo: String,
                    numero: String,
                    extension: String
        }],		
    
    });


db.sucursales.save({ 
    "clave" : "CDMX",
    "nombre" : "Ciudad de México",
    "rfc" : "XAXX010101000",
    "grupo" : "PRINCIPAL",
    "seBorra": true,
	"estatus" : "ALTA",	
	"fechaAlta": Date("22/10/2018"),
	"cveUsuarioAlta":"HROSALES",
    "domicilio" : [ 
        {
            "tipo" : "PRINCIPAL",
            "direccion" : "isabeles",
            "numext" : "461",
            "numint" : "",
            "cp" : "58000",
            "colonia" : "Benito Juarez",
            "municipio" : "",
            "delegacion" : "Venustiano Carranza",
            "estado" : "Ciudad de México"
        }
    ],
    "telefono" : [ 
        {
            "tipo" : "PRINCIPAL",
            "numero" : "5557302122",
            "extension" : ""
        }
    ],

});

//print("SCRIPT FINISHED");
print("·.··.·  █ █ █ (  Enterprise:"+ empresa +" Database:"+ mongodb +"...finish ) █ █ █  ·.··.·");

