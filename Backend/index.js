const express = require("express");
const XLSX = require('xlsx'); //instalar paquete npm install xlsx
const bodyparser= require('body-parser'); //instalar paquete npm install body-parser
const oracledb = require('oracledb'); //instalar paquete npm install oracledb y oracle-instantclient-basic-21.4.0.0.0-1.el8.x86_64.rpm
const JSONTransport = require("nodemailer/lib/json-transport");
const { outFormat } = require("oracledb");
const cors = require('cors');
const nodemailer = require("nodemailer");//instalar paquete npm install nodemailer
const app = express();
const path = require('path');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
const fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'soccerstatsmia2021@gmail.com', // soccerstatsmia2021@gmail.com
      pass: 'joipimudexvfunej', // mia987654321  joipimudexvfunej
    },
  });

  transporter.verify().then(()=>{
      console.log("Listos para envar");
  });

let connection = {
    user: "proyecto",
    password: "1234",
    connectString : "172.17.0.2/ORCL18"};

app.use(bodyparser.urlencoded({
    extended: true
}));


async function enviar (correo, contra){
    let info = await transporter.sendMail({
        from: '"Soccer Statics" <soccerstatsmia2021@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: "Restablecer Password", // Subject line
        text: "Hola! \nPara restablecer su contrasenia requerimos de la confirmacion de su cuenta, debe hacer click en el siguiente enlace http://127.0.0.1:4200/login e iniciar sesion con la siguiente contrasenia: "+contra+"\nEl enlace se vence 2 minutos despues de que se haya generado.", // plain text body
      });
    console.log("Correo Enviado!")
}

async function enviarVerificacion (correo){
  let info = await transporter.sendMail({
      from: '"Soccer Statics" <soccerstatsmia2021@gmail.com>', // sender address
      to: correo, // list of receivers
      subject: "Verificar Cuenta", // Subject line
      text: "Hola! \nPara poder utilizar su cuenta requerimos de la confirmacion de su cuenta, debe hacer click en el siguiente enlace http://127.0.0.1:4200/login e iniciar sesion.", // plain text body
    });
  console.log("Correo Enviado!")
}




app.post("/AddUser", (req,  res) =>{ 
  console.log("body");

  var body='';
  var ruta;
  var cadenaJson;
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
    console.log(body);
    
    cadenaJson= JSON.parse(body);
    console.log(cadenaJson);
    console.log(cadenaJson["email"])
    insertarUsuario(cadenaJson);
    try {
      enviarVerificacion(cadenaJson["email"])
    } catch (error) {
      
    }
    res.status(200).send("ADD User");


    res.end();
});

})
app.post("/AddMembresia", (req,  res) =>{ 
  var body='';
  var cadenaJson;
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
    console.log(body);
    
    cadenaJson= JSON.parse(body);
    console.log(cadenaJson);
    insertarMembresia(cadenaJson);
    res.status(200).send("ADD Membresia");


    res.end();
});

})


app.post("/AddSuscripcion", (req,  res) =>{ 
  var body='';
  var cadenaJson;
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
    console.log(body);
    
    cadenaJson= JSON.parse(body);
    console.log(cadenaJson);
    insertarSuscripcion(cadenaJson);

    res.status(200).send();


    res.end();
});

})


app.post("/ArchivosCarga", (req,  res) =>{ 
  var body='';
  var ruta;
  var cadenaJson;
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
    console.log(body);
    
    fs.writeFileSync('archivo.csv', body);
    fs.unlinkSync("archivoConv.xlsx");
    convertir("archivo.csv")
    res.end();
})

  
})

app.post("/AddNoticia", (req,  res) =>{ 
  var body='';
  var ruta;
  var cadenaJson;
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
    console.log(body);
    
    cadenaJson= JSON.parse(body);
    console.log(cadenaJson);
    console.log(cadenaJson["titulo"])
    console.log(cadenaJson["empleado"])
    console.log(cadenaJson["equipo"])
    insertarNoticia(cadenaJson);

    res.status(200).send("ADD noticia");


    res.end();
})

  
})


app.get("/GetNoticias",(req, res)=>{
  oracledb.getConnection(connection, function (err, connection){
    if (err){
      // Error connecting to DB
      res.set('Content-Type', 'application/json');
      res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connecting to DB",
          detailed_message: err.message
      }));
      return;
    }
    connection.execute("SELECT noticia.titulo as titulo, equipo.nombres as equipo, noticia.detalle as detalle FROM noticia inner join equipo on noticia.equipo = equipo.id ",{},{
      outFormat: oracledb.OBJECT // Return the result as Object
    },function(err,result){
      if (err){
        es.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
        }));
      }else{
        res.set('Content-Type', 'application/json');
          noticias = {Noticias:result.rows }
          res.status(200).send(JSON.stringify(noticias));
      }

  });
});
})


app.get("/getUsers",(req, res)=>{
  var x=2;
  oracledb.getConnection(connection, function (err, connection){
    if (err){
      // Error connecting to DB
      res.set('Content-Type', 'application/json');
      res.status(500).send(JSON.stringify({
          status: 500,
          message: "Error connecting to DB",
          detailed_message: err.message
      }));
      return;
    }
    connection.execute("SELECT correo,password FROM usuario ",{},{
      outFormat: oracledb.OBJECT // Return the result as Object
    },function(err,result){
      if (err){
        es.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
        }));
      }else{
        res.set('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(result.rows));
      }

  });
});
})


app.post("/AccesoLogin", (req,  res) =>{ 
  var body='';
  var ruta;
  var cadenaJson;
  req.on('data', data =>{
      body+=data;
      cadenaJson= JSON.parse(body);

  });

  req.on('end', ()=>{

    

  })

  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT * FROM usuarios where correo = '"+cadenaJson["usuario"]+"'", {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(result.rows));
          console.log(result.rows);
        }
        
    });
});
})


function password(){
  var abecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
	var numeroAleatorio = 3;
  var cadena='';
	// paso 2 - escribir x caracteres

	for(var i = 0; i<8; i++){
		numeroAleatorio = parseInt(Math.random()*abecedario.length);
		cadena+=abecedario[numeroAleatorio];
	}
  return cadena.toString()
}

app.post("/Restablecer", (req,  res) =>{ 
  var body='';
  var cadenaJson;
  var correo;
  var contraProv;

  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      correo = cadenaJson['correo']
      console.log(correo);
      console.log(contraProv);
      contraProv = password();
      try {
        remplazarpass(contraProv, correo, res)
        enviar(correo, contraProv);
      res.status(200).send();
      } catch (error) {
        res.status(500).send();
      }



});



console.log("a veeer")
setTimeout(function() {
  console.log("han pasado 2 minutos")

  try {
    regresarPass()
  //enviar(correo);
  res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
}, 5000);
})


async function remplazarpass(contra, correo){
  let conn;
    conn = await oracledb.getConnection(connection)
    await conn.execute("CALL restablecerContra('"+contra+"', '"+correo+"')",{},{autoCommit:true})
    await conn.rollback()
    console.log('Wow! Si pude!')

  
}

async function regresarPass(){
  let conn;
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(" ROLLBACK",{})
    console.log('Wow! Si pude!')

  
}


app.get("/", (req,  res) =>{ 
  res.send("hola mundo!");
  convertir()
}
)


function convertir(archivo){
  
  var __dirname = path.dirname(require.main.filename);
  let source = path.join(__dirname, archivo);
  let destination = path.join(__dirname, 'archivoConv.xlsx');
  
  try {
    convertCsvToXlsx(source, destination);
  } catch (e) {
    console.error(e.toString());
  }
}

app.post("/jugadorXedad", (req,  res) =>{ 
  var hoy = new Date();
  var antes = new Date();
  var antesPrim = new Date('1/1/1900');
  var body='';
  var edad;
  var cadenaJson;
  var cadena1;
  var cadena2;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      edad = cadenaJson['edad']
      console.log(hoy.toLocaleDateString());
      antes.setFullYear(hoy.getFullYear() - edad);
      console.log(antes.toLocaleDateString());
      console.log(antesPrim.toLocaleDateString());
      cadena1= antesPrim.toLocaleDateString();
      cadena2 = antes.toLocaleDateString();
    });

  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT jugador.nombres_apellidos as nombre, jugador.fecha_nacimiento as fecha, posicion.nombre as posicion, pais.nombre as pais  FROM jugador inner join posicion on posicion.id=jugador.posicion inner join pais on pais.id=jugador.pais where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          jugadores = {Jugadores:result.rows }
          res.status(200).send(JSON.stringify(jugadores));
        }
        
    });
});

  
})

app.post("/directorXedad", (req,  res) =>{ 
  var hoy = new Date();
  var antes = new Date();
  var antesPrim = new Date('1/1/1900');
  var body='';
  var edad;
  var cadenaJson;
  var cadena1;
  var cadena2;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      edad = cadenaJson['edad']
      console.log(hoy.toLocaleDateString());
      antes.setFullYear(hoy.getFullYear() - edad);
      console.log(antes.toLocaleDateString());
      console.log(antesPrim.toLocaleDateString());
      cadena1= antesPrim.toLocaleDateString();
      cadena2 = antes.toLocaleDateString();
    });

  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT directort.nombres_apellidos as nombre, directort.fecha_nacimiento as fecha, pais.nombre as pais  FROM directort inner join pais on pais.id=directort.pais  where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          directores = {Directores:result.rows }
          res.status(200).send(JSON.stringify(directores));
        }
        
    });
});

  
})







app.post("/jugadorXedadMen", (req,  res) =>{ 
  var hoy = new Date();
  var antes = new Date();
  var antesPrim = new Date();
  var body='';
  var edad;
  var cadenaJson;
  var cadena1;
  var cadena2;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      edad = cadenaJson['edad']
      console.log(hoy.toLocaleDateString());
      antesPrim.setFullYear(hoy.getFullYear() - edad);
      console.log(antes.toLocaleDateString());
      console.log(antesPrim.toLocaleDateString());
      cadena1= antesPrim.toLocaleDateString();
      cadena2 = antes.toLocaleDateString();
    });

  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT jugador.nombres_apellidos as nombre, jugador.fecha_nacimiento as fecha, posicion.nombre as posicion, pais.nombre as pais  FROM jugador inner join posicion on posicion.id=jugador.posicion inner join pais on pais.id=jugador.pais where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          jugadores = {Jugadores:result.rows }
          res.status(200).send(JSON.stringify(jugadores));
        }
        
    });
});

  
})

app.post("/directorXedadMen", (req,  res) =>{ 
  var hoy = new Date();
  var antes = new Date();
  var antesPrim = new Date();
  var body='';
  var edad;
  var cadenaJson;
  var cadena1;
  var cadena2;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      edad = cadenaJson['edad']
      console.log(hoy.toLocaleDateString());
      antesPrim.setFullYear(hoy.getFullYear() - edad);
      console.log(antes.toLocaleDateString());
      console.log(antesPrim.toLocaleDateString());
      cadena1= antesPrim.toLocaleDateString();
      cadena2 = antes.toLocaleDateString();
    });

  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT directort.nombres_apellidos as nombre, directort.fecha_nacimiento as fecha, pais.nombre as pais  FROM directort inner join pais on pais.id=directort.pais   where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          directores = {Directores:result.rows }
          res.status(200).send(JSON.stringify(directores));
        }
        
    });
});

  
})




app.post("/equipoXcompeticion", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT equipo.nombres as nombre, equipo.fecha_fundacion as fecha, pais.nombre as pais FROM equipo inner join pais on pais.id=equipo.pais inner join competencia on competencia.nombre= '"+nombre+"' inner join competidor on equipo.id=competidor.equipo and competencia.id=competidor.competencia" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          equipos = {Equipos:result.rows }
          res.status(200).send(JSON.stringify(equipos));
        }
        
    });
});


  
})


app.post("/equipoXpais", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT equipo.nombres as nombre, equipo.fecha_fundacion as fecha, pais.nombre as pais FROM equipo inner join pais on pais.id=equipo.pais  and pais.nombre= '"+nombre+"' and pais.id=equipo.pais" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          equipos = {Equipos:result.rows }
          res.status(200).send(JSON.stringify(equipos));
        }
        
    });
});

  
})





app.post("/equipoXantiguedad", (req,  res) =>{ 
  var hoy = new Date();
  var antes = new Date();
  var antesPrim = new Date();
  var body='';
  var edad;
  var cadenaJson;
  var cadena1;
  var cadena2;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      edad = cadenaJson['edad']
      console.log(hoy.toLocaleDateString());
      antesPrim.setFullYear(hoy.getFullYear() - edad-1);
      antes.setFullYear(hoy.getFullYear() - edad);

      console.log(antes.toLocaleDateString());
      console.log(antesPrim.toLocaleDateString());
      cadena1= antesPrim.toLocaleDateString();
      cadena2 = antes.toLocaleDateString();
    });

  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT equipo.nombres as nombre, equipo.fecha_fundacion as fecha, pais.nombre as pais FROM equipo inner join pais on pais.id=equipo.pais where fecha_fundacion BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          equipos = {Equipos:result.rows }
          res.status(200).send(JSON.stringify(equipos));
        }
        
    });
});

  
})



app.post("/estadioXpais", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT estadio.nombres as nombre, estadio.capacidad as capacidad, pais.nombre as pais , estadio.direccion as dir, estadio.fecha_inauguracion as fecha FROM estadio inner join pais on pais.id=estadio.pais and pais.nombre= '"+nombre+"' and pais.id=estadio.pais" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          estadios = {Estadios:result.rows }
          res.status(200).send(JSON.stringify(estadios));
        }
        
    });
});

  
})


app.post("/estadioXcapacidad", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      capacidad = cadenaJson['capacidad']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT estadio.nombres as nombre, estadio.capacidad as capacidad, pais.nombre as pais , estadio.direccion as dir, estadio.fecha_inauguracion as fecha FROM estadio inner join pais on pais.id=estadio.pais where estadio.capacidad<="+capacidad , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          estadios = {Estadios:result.rows }
          res.status(200).send(JSON.stringify(estadios));
        }
        
    });
});

  
})





app.post("/partidosXequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT (select equipo.nombres from equipo where partido.local = equipo.id) as local,(select equipo.nombres from equipo where  partido.visita = equipo.id) as visita  , partido.FECHA AS fecha, estadio.NOMBRES AS estadio, partido.resultado as resultado FROM partido INNER JOIN estadio ON estadio.ID = partido.ESTADIO inner join equipo on equipo.nombres= '"+nombre+"' and (equipo.id=partido.visita or equipo.id=partido.local)" , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          partidos = {Partidos:result.rows }
          res.status(200).send(JSON.stringify(partidos));
        }
        
    });
});

  
})



app.post("/competenciaXvecesYequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']
      veces = cadenaJson['veces']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT competencia.NOMBRE AS nombre, competencia.ANIO AS anio, pais.NOMBRE AS pais, equipo.NOMBRES AS campeon FROM COMPETENCIA INNER JOIN EQUIPO ON competencia.CAMPEON = equipo.ID INNER JOIN pais ON pais.id = COMPETENCIA.PAIS where equipo.NOMBRES ='"+nombre+"' and ROWNUM <="+veces , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          competencia = {Competencias:result.rows }
          res.status(200).send(JSON.stringify(competencia));
        }
        
    });
});

  
})



app.post("/partidosXgoles", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      cantidad = cadenaJson['goles']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT (select equipo.nombres from equipo inner join partido on partido.id=PART and partido.local = equipo.id) as local,(select equipo.nombres from equipo inner join partido on partido.id=PART and partido.visita = equipo.id) as visita , PART ,goles, partido.FECHA AS fecha, estadio.NOMBRES AS estadio, partido.resultado as resultado FROM (SELECT incidencia.PARTIDO AS PART, COUNT(incidencia.PARTIDO) AS goles FROM INCIDENCIA INNER JOIN partido ON partido.id= INCIDENCIA.partido WHERE INCIDENCIA.detalle='gol'GROUP BY incidencia.PARTIDO ) INNER JOIN partido ON PART=partido.id INNER JOIN estadio ON estadio.ID = partido.ESTADIO WHERE goles<="+cantidad , {}, {
      outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          partidos = {Partidos:result.rows }
          res.status(200).send(JSON.stringify(partidos));
        }
        
    });
});

  
})




app.post("/jugadorEstuvoXequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT equipo.nombres as nombre, equipo.fecha_fundacion as fecha, participante.fecha_in as inicio, participante.fecha_fin as salida, pais.nombre as pais FROM equipo inner join pais on pais.id=equipo.pais inner join jugador on jugador.nombres_apellidos= '"+nombre+"' inner join participante on jugador.id=participante.jugador and equipo.id=participante.equipo" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          equipos = {Equipos:result.rows }
          res.status(200).send(JSON.stringify(equipos));
        }
        
    });
});

  
})

app.post("/directorXequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT directort.nombres_apellidos as nombre, directort.fecha_nacimiento as fecha, pais.nombre as pais  FROM directort inner join pais on pais.id=directort.pais   inner join equipo on nombres= '"+nombre+"' inner join direccion on directort.id=direccion.directort and equipo.id=direccion.equipo and equipo.id=direccion.equipo" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          directores = {Directores:result.rows }
          res.status(200).send(JSON.stringify(directores));
        }
        
    });
});

  
})





app.post("/jugadorXequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT jugador.nombres_apellidos as nombre, jugador.fecha_nacimiento as fecha, posicion.nombre as posicion, pais.nombre as pais  FROM jugador inner join posicion on posicion.id=jugador.posicion inner join pais on pais.id=jugador.pais inner join equipo on equipo.nombres= '"+nombre+"' inner join participante on jugador.id=participante.jugador and equipo.id=participante.equipo" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          jugadores = {Jugadores:result.rows }
          res.status(200).send(JSON.stringify(jugadores));
        }
        
    });
});
  
})
//SELECT jugador.nombres_apellidos as nombre, jugador.fecha_nacimiento as fecha, (select nombre from posicion where posicion.id=jugador.posicion)  as posicion, (select nombre from pais where pais.id=jugador.pais) as pais  FROM jugador inner join equipo on equipo.nombres= 'Municipal' inner join participante on jugador.id=participante.jugador and equipo.id=participante.equipo and participante.fecha_fin= null 
app.post("/directorXequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT directort.nombres_apellidos as nombre, directort.fecha_nacimiento as fecha, pais.nombre as pais  FROM directort inner join pais on pais.id=jugador.pais inner join equipo on nombres= '"+nombre+"' inner join direccion on directort.id=direccion.directort and equipo.id=direccion.equipo" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(result));
        }
        
    });
});

  
})


app.get("/equipo", (req,  res) =>{ 
  var x=2;
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT * FROM equipo ", {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(result.rows));
        }
        
    });
});
})


app.get("/estadios", (req,  res) =>{ 
  var x=2;
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT * FROM estadio ", {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(result.rows));
        }
        
    });
});
})


app.get("/partidos", (req,  res) =>{ 
  var x=2;
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT * FROM partido ", {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(result.rows));
        }
        
    });
});
})


app.get("/competiciones", (req,  res) =>{ 
  var x=2;
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT * FROM competencia ", {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(result.rows));
        }
        
    });
});
})


app.post("/usuariosXequipo", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT usuarios.NOMBRES AS nombres, usuarios.APELLIDOS AS apellidos, usuarios.CORREO AS correo FROM usuarios INNER JOIN SUSCRIPCION ON suscripcion.USUARIO = usuarios.id INNER JOIN EQUIPO ON equipo.ID = suscripcion.EQUIPO WHERE equipo.NOMBRES = '"+nombre+"' " , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          usuarios = {usuarios:result.rows }
          res.status(200).send(JSON.stringify(usuarios));
        }
        
    });
});

});



app.post("/usuariosConMembresia", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT usuarios.NOMBRES AS nombres, usuarios.APELLIDOS AS apellidos, usuarios.CORREO AS correo FROM usuarios WHERE tipo = 4 " , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          usuarios = {usuarios:result.rows }
          res.status(200).send(JSON.stringify(usuarios));
        }
        
    });
});

});


app.post("/usuariosSinMembresia", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT usuarios.NOMBRES AS nombres, usuarios.APELLIDOS AS apellidos, usuarios.CORREO AS correo FROM usuarios WHERE tipo = 3 " , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          usuarios = {usuarios:result.rows }
          res.status(200).send(JSON.stringify(usuarios));
        }
        
    });
});

});



app.post("/usuariosXpais", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['nombre']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT usuarios.NOMBRES AS nombres, usuarios.APELLIDOS AS apellidos, usuarios.CORREO AS correo FROM usuarios INNER JOIN PAIS ON pais.id = usuarios.PAIS  WHERE pais.NOMBRE = '"+nombre+"' AND (usuarios.TIPO = 3 or usuarios.TIPO = 4)" , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          usuarios = {usuarios:result.rows }
          res.status(200).send(JSON.stringify(usuarios));
        }
        
    });
});

});



app.post("/usuariosXgenero", (req,  res) =>{ 
  var body='';
  var nombre;
  var cadenaJson;
  //res.send("Cargar Estadios");
  req.on('data', data =>{
      body+=data;
      cadenaJson = JSON.parse(body);
      nombre = cadenaJson['genero']

  });
  oracledb.getConnection(connection, function (err, connection) {
    if (err) {
        // Error connecting to DB
        res.set('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({
            status: 500,
            message: "Error connecting to DB",
            detailed_message: err.message
        }));
        return;
    }
    connection.execute("SELECT usuarios.NOMBRES AS nombres, usuarios.APELLIDOS AS apellidos, usuarios.CORREO AS correo FROM usuarios INNER JOIN GENERO ON GENERO .id = usuarios.GENERO  WHERE GENERO .NOMBRE = '"+nombre+"' AND (usuarios.TIPO = 3 or usuarios.TIPO = 4) " , {}, {
        outFormat: oracledb.OBJECT // Return the result as Object
    }, function (err, result) {
        if (err) {
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error getting the dba_tablespaces",
                detailed_message: err.message
            }));
        } else {
          res.set('Content-Type', 'application/json');
          usuarios = {usuarios:result.rows }
          res.status(200).send(JSON.stringify(usuarios));
        }
        
    });
});

});




//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/", (req,  res) =>{ 
    res.send("hola mundo!");
    enviar();
})

app.post("/cargarEstadios", (req,  res) =>{ 
    
  var body='';
    var ruta;
    var cadenaJson;
    res.send("Cargar Estadios");
    req.on('data', data =>{
        body+=data;

    });

    req.on('end', ()=>{
        console.log(body);
        res.statusCode=200;
        //res.setHeader('Content-Type', 'application/json');
        cadenaJson= JSON.parse(body);
        console.log(cadenaJson);
        ruta = cadenaJson['ruta'];
        console.log(ruta);
        insertarEstadios(cargarArchivo(ruta));
        res.end();
    })

    var fecha = numeroAFecha(4606, true);
    console.log(fecha);
})
app.post("/cargarDirectores", (req,  res) =>{ 
  var body='';
  var ruta;
  var cadenaJson;
  res.send("Cargar Directores");
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
      console.log(body);
      res.statusCode=200;
      //res.setHeader('Content-Type', 'application/json');
      cadenaJson= JSON.parse(body);
      console.log(cadenaJson);
      ruta = cadenaJson['ruta'];
      console.log(ruta);
      insertarDirectores(cargarArchivo(ruta));
      res.end();
  })

  var fecha = numeroAFecha(4606, true);
  console.log(fecha);})


app.post("/cargarEquipos", (req,  res) =>{ 
    var body='';
    var ruta;
    var cadenaJson;
    res.send("Cargar Equipos");
    req.on('data', data =>{
        body+=data;

    });

    req.on('end', ()=>{
        console.log(body);
        res.statusCode=200;
        //res.setHeader('Content-Type', 'application/json');
        cadenaJson= JSON.parse(body);
        console.log(cadenaJson);
        ruta = cadenaJson['ruta'];
        console.log(ruta);
        insertarEquipos(cargarArchivo(ruta));
        res.end();
    })

    var fecha = numeroAFecha(4606, true);
    console.log(fecha);})


app.post("/cargarJugadores", (req,  res) =>{ 
    var body='';
    var ruta;
    var cadenaJson;
    res.send("Cargar Jugadores");
    req.on('data', data =>{
        body+=data;

    });

    req.on('end', ()=>{
        console.log(body);
        res.statusCode=200;
        //res.setHeader('Content-Type', 'application/json');
        cadenaJson= JSON.parse(body);
        console.log(cadenaJson);
        ruta = cadenaJson['ruta'];
        console.log(ruta);
        insertarJugadores(cargarArchivo(ruta));
        res.end();
    })

    var fecha = numeroAFecha(4606, true);
    console.log(fecha);})

app.post("/cargarCompeticiones", (req,  res) =>{ 
  var body='';
    var ruta;
    var cadenaJson;
    res.send("Cargar Competiciones");
    req.on('data', data =>{
        body+=data;

    });

    req.on('end', ()=>{
        console.log(body);
        res.statusCode=200;
        //res.setHeader('Content-Type', 'application/json');
        cadenaJson= JSON.parse(body);
        console.log(cadenaJson);
        ruta = cadenaJson['ruta'];
        console.log(ruta);
        insertarCompetencias(cargarArchivo(ruta));
        res.end();
    })

    var fecha = numeroAFecha(4606, true);
    console.log(fecha);})

app.post("/cargarPartidoIncidencia", (req,  res) =>{ 
  var body='';
  var ruta;
  var cadenaJson;
  res.send("Cargar Partidos e Incidencias");
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
      console.log(body);
      res.statusCode=200;
      //res.setHeader('Content-Type', 'application/json');
      cadenaJson= JSON.parse(body);
      console.log(cadenaJson);
      ruta = cadenaJson['ruta'];
      console.log(ruta);
      insertarPartidos(cargarArchivo(ruta));
      res.end();
  })

  var fecha = numeroAFecha(4606, true);
  console.log(fecha);})



app.listen(3000, (Request)=>(
    console.log("servidor corriendo en el puerto",3000)
));

function cargarArchivo(ruta){
    const libro = XLSX.readFile(ruta);
    const libroSheets = libro.SheetNames;
    const sheet = libroSheets[0];
    const data = XLSX.utils.sheet_to_json(libro.Sheets[sheet]);
    
    console.log(libroSheets);
    return data;
}





async function insertarMembresia(datos){
  let conn
  var date = new Date();
  try {
    conn = await oracledb.getConnection(connection)
  
    const result = await conn.execute("INSERT INTO membresia VALUES(TEST_ID_SEQ.nextval, TO_DATE('"+date.toLocaleDateString()+"','DD/MM/YYYY'), "+datos["id"]+", 15)",{},{autoCommit:true})
  
    console.log("aqui")
  
   console.log('MEMBRESIA REGISTRADO CORRECTAMENTE');  
  
  } catch (err) {

    console.log('Ouch!', err)
    
  } finally {
    if (conn) {
      await conn.close()
    }
  }
  try {
    conn = await oracledb.getConnection(connection)
  
    const result = await conn.execute("UPDATE usuarios SET tipo = 4 where id= "+datos["id"],{},{autoCommit:true})
  
    console.log("aqui")
  
    console.log('MEMBRESIA REGISTRADO CORRECTAMENTE');  
  
  } catch (err) {

    console.log('Ouch!', err)
  
  } finally {
    if (conn) {
      await conn.close()
    }
  }

}




async function insertarSuscripcion(datos){
  let conn
  var date = new Date();
try {
  conn = await oracledb.getConnection(connection)
  
  const result = await conn.execute("INSERT INTO suscripcion VALUES(TEST_ID_SEQ.nextval, (SELECT id FROM equipo WHERE nombres='"+datos["equipo"]+"' and rownum = 1), "+datos["id"]+")",{},{autoCommit:true})
  
  console.log("aqui")
  
  console.log('SUSCRIPCION REGISTRADO CORRECTAMENTE');  
  
} catch (err) {

  console.log('Ouch!', err)
  
} finally {
  if (conn) {
    await conn.close()
  }
}
}





async  function insertarEstadios(datos){
    for(const itemFile of datos){
        let conn
        var pais=0;
      try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
        )
        console.log("aqui")
        console.log(result.rows[0])
        global.id = result.rows[0]
        pais = result.rows[0]    
      } catch (err) {
        console.log('Ouch!', err)
      } finally {
        if (conn) {
          await conn.close()
        }
      }
        
    if(pais == undefined){
        try {
            conn = await oracledb.getConnection(connection)
        
            const result = await conn.execute("INSERT INTO pais VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Pais"]+"')",{},{autoCommit:true})
            console.log('Wow! Si inserte!')
    
          } catch (err) {
            console.log('Ouch! No inserte!')
          } finally {
            if (conn) { 
              await conn.close()
            }
          }
    }

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
      )
      console.log("aqui")
      console.log(result.rows[0])
      global.id = result.rows[0]
      pais = result.rows[0]    
    } catch (err) {
      console.log('Ouch!', err)
    } finally {
      if (conn) {
        await conn.close()
      }
    }
      

    //insertar estadios
    try {
        conn = await oracledb.getConnection(connection)
    
        const result = await conn.execute("INSERT INTO estadio VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"', TO_DATE('"+itemFile["Fecha_ing"]+"','DD/MM/YYYY') ,"+itemFile["Capacidad"]+" ,"+pais+" ,'"+itemFile["Direccion"]+"','"+itemFile["Estado"]+"')",{},{autoCommit:true})
        console.log('Wow! Si inserte!')

      } catch (err) {
        console.log('Ouch! No inserte! estadio', err)
      } finally {
        if (conn) { 
          await conn.close()
        }
      }
    }


}

async  function insertarDirectores(datos){
    for(const itemFile of datos){
        let conn
        var pais=0;
        var paisEquipo=0;
        var existe = false;
        var existeDir = false;
        var director = 0;
        var equipo = 0;

        console.log(itemFile["Fecha_Fin"]);
      try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
        )
        console.log("aqui")
        console.log(result.rows[0])
        pais = result.rows[0]    
      } catch (err) {
        console.log('Ouch!', err)
      } finally {
        if (conn) {
          await conn.close()
        }
      }
        
    if(pais == undefined){
        try {
            conn = await oracledb.getConnection(connection)
        
            const result = await conn.execute("INSERT INTO pais VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Pais"]+"')",{},{autoCommit:true})
            console.log('Wow! Si inserte!')
    
          } catch (err) {
            console.log('Ouch! No inserte!')
          } finally {
            if (conn) { 
              await conn.close()
            }
          }
    }

    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
        )
        console.log("aqui")
        console.log(result.rows[0])
        global.id = result.rows[0]
        pais = result.rows[0]    
      } catch (err) {
        console.log('Ouch!', err)
      } finally {
        if (conn) {
          await conn.close()
        }
      }

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM pais where nombre='"+itemFile["Pais_Equipo"]+"'"
      )
      console.log("aqui")
      console.log(result.rows[0])
      paisEquipo = result.rows[0]    
    } catch (err) {
      console.log('Ouch!', err)
    } finally {
      if (conn) {
        await conn.close()
      }
    }
      //consultar si ya existe el equipo
    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM equipo where nombres='"+itemFile["Equipo"]+"' and pais="+paisEquipo
        )
        console.log("aqui")
        console.log(result.rows[0])
        if(result.rows[0]!=undefined){
          existe = true;  
          equipo = result.rows[0];
        }
      } catch (err) {
        console.log('Ouch!', err)
        existe = true;
      } finally {
        if (conn) {
          await conn.close()
        }
      }

      //consultar si existe director

      try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM directort where nombres_apellidos='"+itemFile["Nombres"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+itemFile["Fecha_Nac"]+"','DD/MM/YYYY')" 
        )
        console.log("aqui")
        console.log(result.rows[0])
        if(result.rows[0]!=undefined){
          existeDir = true;  
        }
      } catch (err) {
        console.log('Ouch!', err)
        existeDir = true;
      } finally {
        if (conn) {
          await conn.close()
        }
      }
    //insertar director 

    if(!existeDir){
      try {
          conn = await oracledb.getConnection(connection)
          const result = await conn.execute("INSERT INTO directort VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombres"]+"', TO_DATE('"+itemFile["Fecha_Nac"]+"','DD/MM/YYYY') ,"+pais+", '"+itemFile["Estado"]+"', null )",{},{autoCommit:true})
          console.log('Wow! Si inserte!')
      }catch (err) {
          console.log('Ouch! No inserte! Director', err)
      }finally {
          if (conn) { 
              await conn.close()
           }
        }
    }else{
    }
    // id del director
    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM directort where nombres_apellidos='"+itemFile["Nombres"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+itemFile["Fecha_Nac"]+"','DD/MM/YYYY')" 
      )
      console.log("aqui")
      console.log(result.rows[0])
      director = result.rows[0]
    } catch (err) {
      console.log('Ouch!', err)
    } finally {
      if (conn) {
        await conn.close()
      }
    }
    //insertar direccion 
    if(existe){
      try {
          conn = await oracledb.getConnection(connection)
          const result = await conn.execute("INSERT INTO direccion VALUES (TEST_ID_SEQ.nextval, "+director+","+equipo+", TO_DATE('"+itemFile["Fecha_Ini"]+"','DD/MM/YYYY') ,TO_DATE('"+itemFile["Fecha_Fin"]+"','DD/MM/YYYY') )",{},{autoCommit:true})
          console.log('Wow! Si inserte!')
      }catch (err) {
          console.log('Ouch! No inserte! direccion', err)
          console.log(numeroAFecha(itemFile["Fecha_Fin"], true))
      }finally {
          if (conn) { 
              await conn.close()
           }
        }
    }


    }
    



}


async function insertarUsuario(datos){
    let conn
  try {
    conn = await oracledb.getConnection(connection)
    
    const result = await conn.execute("INSERT INTO usuarios VALUES (TEST_ID_SEQ.nextval, '"+datos["nombre"]+"','"+datos["apellido"]+"','"+datos["pass"]+"','"+datos["email"]+"',"+datos["telefono"]+",null,"+
    "(Select id from genero where nombre='"+ datos["genero"]+"'),TO_DATE('"+datos["fechan"]+"','DD/MM/YYYY'),TO_DATE('"+datos["fechar"]+"','DD/MM/YYYY'),'"+datos["dir"]+"',(Select id from pais where nombre='"+ datos["pais"]+"'),"+ datos["rol"]+")",{},{autoCommit:true})
    
    console.log("aqui")
    console.log('USUARIO REGISTRADO CORRECTAMENTE');  
    
  } catch (err) {
    console.log(datos["nombre"]+"\tPrueba")
    console.log('Ouch!', err)
    
  } finally {
    if (conn) {
      await conn.close()
    }
  }
}



async function insertarNoticia(datos){
  let conn
try {
  conn = await oracledb.getConnection(connection)
  
  const result = await conn.execute("INSERT INTO noticia values(TEST_ID_SEQ.nextval, '"+datos["titulo"]+"', '"+datos["detalle"]+"', (SELECT id FROM equipo WHERE nombres='"+datos["equipo"]+"' and rownum = 1), "+datos["empleado"]+")",{},{autoCommit:true})
  
  console.log("aqui")
  console.log('NOTICIA REGISTRADO CORRECTAMENTE');  
  
} catch (err) {
  console.log('Ouch!', err)
  
} finally {
  if (conn) {
    await conn.close()
  }
}
}


async  function insertarEquipos(datos){
    for(const itemFile of datos){
        let conn
        var pais=0;
        var existe = false;
      try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
        )
        console.log("aqui")
        console.log(result.rows[0])
        global.id = result.rows[0]
        pais = result.rows[0]    
      } catch (err) {
        console.log('Ouch!', err)
      } finally {
        if (conn) {
          await conn.close()
        }
      }
        
    if(pais == undefined){
        try {
            conn = await oracledb.getConnection(connection)
        
            const result = await conn.execute("INSERT INTO pais VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Pais"]+"')",{},{autoCommit:true})
            console.log('Wow! Si inserte!')
    
          } catch (err) {
            console.log('Ouch! No inserte!')
          } finally {
            if (conn) { 
              await conn.close()
            }
          }
    }

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
      )
      console.log("aqui")
      console.log(result.rows[0])
      global.id = result.rows[0]
      pais = result.rows[0]    
    } catch (err) {
      console.log('Ouch!', err)
    } finally {
      if (conn) {
        await conn.close()
      }
    }



      //consultar si ya existe el equipo
    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM equipo where nombres='"+itemFile["Nombre"]+"' and pais="+pais
        )
        console.log("aqui")
        console.log(result.rows[0])
        if(result.rows[0]!=undefined){
          existe = true;  
        }
      } catch (err) {
        console.log('Ouch!', err)
        existe = true;
      } finally {
        if (conn) {
          await conn.close()
        }
      }
    //insertar equipos 

    if(!existe){
        try {
            conn = await oracledb.getConnection(connection)
        
            const result = await conn.execute("INSERT INTO equipo VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"', TO_DATE('"+itemFile["Fecha_Fun"]+"','DD/MM/YYYY') ,"+pais+", null )",{},{autoCommit:true})
            console.log('Wow! Si inserte!')
    
          } catch (err) {
            console.log('Ouch! No inserte! equipo', err)
          } finally {
            if (conn) { 
              await conn.close()
            }
          }
        }
    }
    


}


async  function insertarJugadores(datos){
  for(const itemFile of datos){
      let conn
      var pais=0;
      var paisEquipo=0;
      var existe = false;
      var existeJug = false;
      var jugador = 0;
      var equipo = 0;
      var posicion

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM pais where nombre='"+itemFile["Nacionalidad"]+"'"
      )
      console.log("aqui")
      console.log(result.rows[0])
      pais = result.rows[0]    
    } catch (err) {
      console.log('Ouch! consulta pais1', err)
    } finally {
      if (conn) {
        await conn.close()
      }
    }
      
  if(pais == undefined){
      try {
          conn = await oracledb.getConnection(connection)
      
          const result = await conn.execute("INSERT INTO pais VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nacionalidad"]+"')",{},{autoCommit:true})
          console.log('Wow! Si inserte!')
  
        } catch (err) {
          console.log('Ouch! No inserte!')
        } finally {
          if (conn) { 
            await conn.close()
          }
        }
  }

  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM pais where nombre='"+itemFile["Nacionalidad"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    global.id = result.rows[0]
    pais = result.rows[0]    
  } catch (err) {
    console.log('Ouch! consulta pais ', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }

  //consultar posicion
  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM posicion where nombre='"+itemFile["Posicion"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    posicion = result.rows[0]    
  } catch (err) {
    console.log('Ouch! Posicion1', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }

//insertar posicion si no existe 
  if(posicion == undefined){
    try {
        conn = await oracledb.getConnection(connection)
    
        const result = await conn.execute("INSERT INTO posicion VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Posicion"]+"')",{},{autoCommit:true})
        console.log('Wow! Si inserte!')

      } catch (err) {
        console.log('Ouch! No inserte!')
      } finally {
        if (conn) { 
          await conn.close()
        }
      }
  }
  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM posicion where nombre='"+itemFile["Posicion"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    posicion = result.rows[0]    
  } catch (err) {
    console.log('Ouch! Posicion2', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }


  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM pais where nombre='"+itemFile["Pais_Equipo"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    paisEquipo = result.rows[0]    
  } catch (err) {
    console.log('Ouch! pais equipo', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }
    //consultar si ya existe el equipo
  try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM equipo where nombres='"+itemFile["Equipo"]+"' and pais="+paisEquipo
      )
      console.log("aqui")
      console.log(result.rows[0])
      if(result.rows[0]!=undefined){
        existe = true;  
        equipo = result.rows[0];
      }
    } catch (err) {
      console.log('Ouch! consulta equipo', err)
      console.log(itemFile["Equipo"])
      console.log(paisEquipo)
      existe = true;
    } finally {
      if (conn) {
        await conn.close()
      }
    }

    //consultar si existe el jugador

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM jugador where nombres_apellidos='"+itemFile["Nombre"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+itemFile["Fecha_Nac"]+"','DD/MM/YYYY')" 
      )
      console.log("aqui")
      console.log(result.rows[0])
      if(result.rows[0]!=undefined){
        existeJug = true;  
      }
    } catch (err) {
      console.log('Ouch! select jugador1', err)
      console.log(pais)

      existeJug = true;
    } finally {
      if (conn) {
        await conn.close()
      }
    }
  //insertar director 

  if(!existeJug){
    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute("INSERT INTO jugador VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"', TO_DATE('"+itemFile["Fecha_Nac"]+"','DD/MM/YYYY') ,"+pais+","+posicion+", null )",{},{autoCommit:true})
        console.log('Wow! Si inserte!')
    }catch (err) {
        console.log('Ouch! No inserte! Jugador', err)
    }finally {
        if (conn) { 
            await conn.close()
         }
      }
  }else{
  }
  // id del director
  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM jugador where nombres_apellidos='"+itemFile["Nombre"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+itemFile["Fecha_Nac"]+"','DD/MM/YYYY')" 
    )
    console.log("aqui")
    console.log(result.rows[0])
    jugador = result.rows[0]
  } catch (err) {
    console.log('Ouch! select jugador', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }
  //insertar participacion 
  if(existe){
    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute("INSERT INTO participante VALUES (TEST_ID_SEQ.nextval, "+jugador+","+equipo+", TO_DATE('"+itemFile["Fecha_Ini"]+"','DD/MM/YYYY') ,TO_DATE('"+itemFile["Fecha_Fin"]+"','DD/MM/YYYY') )",{},{autoCommit:true})
        console.log('Wow! Si inserte!')
    }catch (err) {
        console.log('Ouch! No inserte! Participante', err)
        console.log(itemFile["Fecha_Fin"])
    }finally {
        if (conn) { 
            await conn.close()
         }
      }
  }


  }
  



}


async  function insertarCompetencias(datos){
  for(const itemFile of datos){
      let conn
      var pais=0;
      var paisEquipo=0;
      var existe = false;
      var existeComp = false;
      var competencia = 0;
      var equipo = 0;
      var tipo = 0;
      var Campeon = 0;


    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
      )
      console.log("aqui")
      console.log(result.rows[0])
      pais = result.rows[0]    
    } catch (err) {
      console.log('Ouch! consulta pais1', err)
    } finally {
      if (conn) {
        await conn.close()
      }
    }
      
  if(pais == undefined){
      try {
          conn = await oracledb.getConnection(connection)
      
          const result = await conn.execute("INSERT INTO pais VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Pais"]+"')",{},{autoCommit:true})
          console.log('Wow! Si inserte!')
  
        } catch (err) {
          console.log('Ouch! No inserte!')
        } finally {
          if (conn) { 
            await conn.close()
          }
        }
  }

  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM pais where nombre='"+itemFile["Pais"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    global.id = result.rows[0]
    pais = result.rows[0]    
  } catch (err) {
    console.log('Ouch! consulta pais ', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }

  //consultar posicion
  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM tipocompetencia where nombre='"+itemFile["Tipo"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    tipo = result.rows[0]    
  } catch (err) {
    console.log('Ouch! tipo', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }

//insertar posicion si no existe 
  if(tipo == undefined){
    try {
        conn = await oracledb.getConnection(connection)
    
        const result = await conn.execute("INSERT INTO tipocompetencia VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Tipo"]+"')",{},{autoCommit:true})
        console.log('Wow! Si inserte!')

      } catch (err) {
        console.log('Ouch! No inserte!')
      } finally {
        if (conn) { 
          await conn.close()
        }
      }
  }
  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM tipocompetencia where nombre='"+itemFile["Tipo"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    tipo = result.rows[0]    
  } catch (err) {
    console.log('Ouch! tipo', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }


  try {
    conn = await oracledb.getConnection(connection)
    const result = await conn.execute(
      "SELECT id FROM pais where nombre='"+itemFile["Pais_Equipo"]+"'"
    )
    console.log("aqui")
    console.log(result.rows[0])
    paisEquipo = result.rows[0]    
  } catch (err) {
    console.log('Ouch! pais equipo', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }
    //consultar si ya existe el equipo
  try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM equipo where nombres='"+itemFile["Equipo"]+"' and pais="+paisEquipo
      )
      console.log("aqui")
      console.log(result.rows[0])
      if(result.rows[0]!=undefined){
        existe = true;  
        equipo = result.rows[0];
      }
    } catch (err) {
      console.log('Ouch! consulta equipo', err)
      console.log(itemFile["Equipo"])
      console.log(paisEquipo)
      existe = true;
    } finally {
      if (conn) {
        await conn.close()
      }
    }

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM equipo where nombres='"+itemFile["Campeon"]+"' and pais="+paisEquipo
      )
      console.log("aqui")
      console.log(result.rows[0])
      if(result.rows[0]!=undefined){
        existe = true;  
        Campeon = result.rows[0];

      }
    } catch (err) {
      console.log('Ouch! consulta equipo', err)
      console.log(itemFile["Equipo"])
      console.log(paisEquipo)
      existe = true;
    } finally {
      if (conn) {
        await conn.close()
      }
    }
    //consultar si existe el competencia

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM competencia where nombre='"+itemFile["Nombre"]+"' and pais="+pais+" and anio="+itemFile["Año"]
      )
      console.log("aqui")
      console.log(result.rows[0])
      if(result.rows[0]!=undefined){
        existeComp = true;  
      }
    } catch (err) {
      console.log('Ouch! select comp', err)
      console.log(pais)

      existeComp = true;
    } finally {
      if (conn) {
        await conn.close()
      }
    }
  //insertar director 

  if(!existeComp){
    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute("INSERT INTO competencia VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"',"+itemFile["Año"]+" ,"+tipo+","+Campeon+", "+pais+" )",{},{autoCommit:true})
        console.log('Wow! Si inserte!')
    }catch (err) {
        console.log('Ouch! No inserte! Jugador', err)
    }finally {
        if (conn) { 
            await conn.close()
         }
      }
  }else{
  }
  // id del director
  try {
    conn = await oracledb.getConnection(connection)
    console.log("Anio "+itemFile["Año"])
    const result = await conn.execute(
      "SELECT id FROM competencia where nombre='"+itemFile["Nombre"]+"' and pais="+pais+" and anio="+itemFile["Año"]
      )
    console.log("aqui")
    console.log(result.rows[0])
    competencia = result.rows[0]
  } catch (err) {
    console.log('Ouch! select jugador', err)
  } finally {
    if (conn) {
      await conn.close()
    }
  }
  //insertar participacion 
  if(existe){
    try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute("INSERT INTO competidor VALUES (TEST_ID_SEQ.nextval, "+equipo+","+competencia+" )",{},{autoCommit:true})
        console.log('Wow! Si inserte!')
    }catch (err) {
        console.log('Ouch! No inserte! Participante', err)
    }finally {
        if (conn) { 
            await conn.close()
         }
      }
  }


  }
  



}

async  function insertarPartidos(datos){
  for(const itemFile of datos){
      let conn
      var pais=0;
      var partido=0;
      var existe = false;
      var existePart = false;
      

      try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "SELECT id FROM partido where fecha=TO_DATE('"+itemFile["Fecha"]+"','DD/MM/YYYY') and estadio= (select estadio.id from estadio inner join pais on estadio.nombres='"+itemFile["Estadio"]+"' and pais.nombre='"+itemFile["Pais_Local"]+"' and pais.id=estadio.pais)" 
        )
        console.log("aqui")
        console.log(result.rows[0])
        if(result.rows[0]!=undefined){
          existePart = true;  
        }
      } catch (err) {
        console.log('Ouch! select partido1', err)
        console.log(pais)
  
        existePart = true;
      } finally {
        if (conn) {
          await conn.close()
        }
      }

    if (!existePart){
      try {
        conn = await oracledb.getConnection(connection)
        const result = await conn.execute(
          "insert into partido values( TEST_ID_SEQ.nextval,"+
            "TO_DATE('"+itemFile["Fecha"]+"','DD/MM/YYYY'),"+
           " (select estadio.id from estadio inner join pais on estadio.nombres='"+itemFile["Estadio"]+"' and pais.nombre='"+itemFile["Pais_Local"]+"' and pais.id=estadio.pais),"+
            
           " "+itemFile["Asistencia"]+", "+
            "(select equipo.id from equipo inner join pais on equipo.nombres= '"+itemFile["Equipo_Visita"]+"' and pais.nombre = '"+itemFile["Pais_Visita"]+"' and pais.id=equipo.pais) ,"+
            "(select equipo.id from equipo inner join pais on equipo.nombres= '"+itemFile["Equipo_Local"]+"' and pais.nombre = '"+itemFile["Pais_Local"]+"' and pais.id=equipo.pais), "+
            "'"+itemFile["Resultado"]+"',"+
            "'"+itemFile["Estado"]+"' )",{},{autoCommit:true})
  
        console.log("aqui")
  
      } catch (err) {
        console.log('Ouch! consulta partido', err)
      } finally {
        if (conn) {
          await conn.close()
        }
      }
    }
    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute(
        "SELECT id FROM partido where fecha=TO_DATE('"+itemFile["Fecha"]+"','DD/MM/YYYY') and estadio= (select estadio.id from estadio inner join pais on estadio.nombres='"+itemFile["Estadio"]+"' and pais.nombre='"+itemFile["Pais_Local"]+"' and pais.id=estadio.pais)" 
      )
      console.log("aqui")
      console.log(result.rows[0])
      partido=result.rows[0];
    } catch (err) {
      console.log('Ouch! select partido2', err)
      console.log(pais)

      existePart = true;
    } finally {
      if (conn) {
        await conn.close()
      }
    }

    try {
      conn = await oracledb.getConnection(connection)
      const result = await conn.execute("INSERT INTO incidencia VALUES (TEST_ID_SEQ.nextval, (select jugador.id from jugador inner join participante   on jugador.nombres_apellidos = '"+itemFile["Jugador"]+"' and participante.jugador = jugador.id  inner join equipo on equipo.id = participante.equipo and equipo.nombres= '"+itemFile["Equipo_Incidencia"]+"' where ROWNUM <= 1),"+itemFile["Minuto"]+", "+partido+" ,(select equipo.id from equipo inner join pais on equipo.nombres= '"+itemFile["Equipo_Incidencia"]+"' and (pais.nombre = '"+itemFile["Pais_Local"]+"' or pais.nombre = '"+itemFile["Pais_Visita"]+"') and pais.id=equipo.pais where ROWNUM <= 1), '"+itemFile["Incidencia"]+"' )",{},{autoCommit:true})
      console.log('Wow! Si inserte!')
    }catch (err) {
      console.log('Ouch! No inserte! Participante..', err)
      console.log(itemFile["Fecha_Fin"])
   }finally {
      if (conn) { 
          await conn.close()
       }
    }
      
  


  }
  



}

function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}

function numeroAFecha(numeroDeDias, esExcel = false) {
    if(numeroDeDias==undefined){
      return "";
    }
    var diasDesde1900 = esExcel ? 25567 + 2 : 25567;
    fecha=new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    fecha.outFormat
    console.log(fecha.toLocaleDateString());
    
    return fecha.toLocaleDateString();
  }




function consultaSelectGenero(){
    oracledb.getConnection(connection, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("SELECT * FROM genero", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the dba_tablespaces",
                    detailed_message: err.message
                }));
            } else {
                if(result.rows=[]){
                    console.log("nulo")
                }
                console.log(result.rows);
            }
            
        });
    });
  }
