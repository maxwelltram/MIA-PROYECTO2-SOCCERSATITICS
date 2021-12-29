const express = require("express");
const XLSX = require('xlsx'); //instalar paquete npm install xlsx
const bodyparser= require('body-parser'); //instalar paquete npm install body-parser
const oracledb = require('oracledb'); //instalar paquete npm install oracledb y oracle-instantclient-basic-21.4.0.0.0-1.el8.x86_64.rpm
const JSONTransport = require("nodemailer/lib/json-transport");
const { outFormat } = require("oracledb");
const cors = require('cors');
const nodemailer = require("nodemailer");//instalar paquete npm install nodemailer
const app = express();

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


async function enviar (){
    let info = await transporter.sendMail({
        from: '"Soccer Statics" <soccerstatsmia2021@gmail.com>', // sender address
        to: "bryanpaez.125@gmail.com", // list of receivers
        subject: "Comprobacion de email", // Subject line
        text: "Hola mundo, requerimos de la confirmacion de su cuenta, debe hacer click en el siguiente enlace https://google.com.gt", // plain text body
        html: "<b>Hola mundo, requerimos de la confirmacion de su cuenta, debe hacer click en el siguiente enlace https://google.com.gt</b>", // html body
      });
}


app.post("/AddUser", (req,  res) =>{ 
  console.log("body");

  var body='';
  var ruta;
  var cadenaJson;
  res.send("ADD User");
  req.on('data', data =>{
      body+=data;

  });

  req.on('end', ()=>{
    console.log(body);
    res.statusCode=200;
    //res.setHeader('Content-Type', 'application/json');
    cadenaJson= JSON.parse(body);
    console.log(cadenaJson);
    res.end();
})

  
})


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
    connection.execute("SELECT * FROM jugador where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
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
    connection.execute("SELECT * FROM directort where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
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
    connection.execute("SELECT * FROM jugador where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
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
    connection.execute("SELECT * FROM directort where fecha_nacimiento BETWEEN TO_DATE('"+antesPrim.toLocaleDateString()+"','DD/MM/YYYY') and TO_DATE('"+antes.toLocaleDateString()+"','DD/MM/YYYY') " , {}, {
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
    connection.execute("SELECT * FROM equipo inner join competencia on nombre= '"+nombre+"' inner join competidor on equipo.id=competidor.equipo and competencia.id=competidor.competencia" , {}, {
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
    connection.execute("SELECT * FROM jugador inner join equipo on nombres= '"+nombre+"' inner join participante on jugador.id=participante.jugador and equipo.id=participante.equipo" , {}, {
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
    connection.execute("SELECT * FROM directort inner join equipo on nombres= '"+nombre+"' inner join direccion on directort.id=direccion.directort and equipo.id=direccion.equipo" , {}, {
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
    console.log("servidor corriendo en el puerto",3000),
    cargarArchivo("archivoEstadios.xlsx")
));

function cargarArchivo(ruta){
    const libro = XLSX.readFile(ruta);
    const libroSheets = libro.SheetNames;
    const sheet = libroSheets[0];
    const data = XLSX.utils.sheet_to_json(libro.Sheets[sheet]);
    
    console.log(libroSheets);
    return data;
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
    
        const result = await conn.execute("INSERT INTO estadio VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"', TO_DATE('"+numeroAFecha(itemFile["Fecha_ing"], true)+"','DD/MM/YYYY') ,"+itemFile["Capacidad"]+" ,"+pais+" ,'"+itemFile["Direccion"]+"','"+itemFile["Estado"]+"')",{},{autoCommit:true})
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
          "SELECT id FROM directort where nombres_apellidos='"+itemFile["Nombres"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+numeroAFecha(itemFile["Fecha_Nac"], true)+"','DD/MM/YYYY')" 
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
          const result = await conn.execute("INSERT INTO directort VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombres"]+"', TO_DATE('"+numeroAFecha(itemFile["Fecha_Nac"], true)+"','DD/MM/YYYY') ,"+pais+", '"+itemFile["Estado"]+"', null )",{},{autoCommit:true})
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
        "SELECT id FROM directort where nombres_apellidos='"+itemFile["Nombres"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+numeroAFecha(itemFile["Fecha_Nac"], true)+"','DD/MM/YYYY')" 
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
          const result = await conn.execute("INSERT INTO direccion VALUES (TEST_ID_SEQ.nextval, "+director+","+equipo+", TO_DATE('"+numeroAFecha(itemFile["Fecha_Ini"], true)+"','DD/MM/YYYY') ,TO_DATE('"+numeroAFecha(itemFile["Fecha_Fin"], true)+"','DD/MM/YYYY') )",{},{autoCommit:true})
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
        
            const result = await conn.execute("INSERT INTO equipo VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"', TO_DATE('"+numeroAFecha(itemFile["Fecha_Fun"], true)+"','DD/MM/YYYY') ,"+pais+", null )",{},{autoCommit:true})
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
        "SELECT id FROM jugador where nombres_apellidos='"+itemFile["Nombre"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+numeroAFecha(itemFile["Fecha_Nac"], true)+"','DD/MM/YYYY')" 
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
        const result = await conn.execute("INSERT INTO jugador VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Nombre"]+"', TO_DATE('"+numeroAFecha(itemFile["Fecha_Nac"], true)+"','DD/MM/YYYY') ,"+pais+","+posicion+", null )",{},{autoCommit:true})
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
      "SELECT id FROM jugador where nombres_apellidos='"+itemFile["Nombre"]+"' and pais="+pais+" and fecha_nacimiento= TO_DATE('"+numeroAFecha(itemFile["Fecha_Nac"], true)+"','DD/MM/YYYY')" 
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
        const result = await conn.execute("INSERT INTO participante VALUES (TEST_ID_SEQ.nextval, "+jugador+","+equipo+", TO_DATE('"+numeroAFecha(itemFile["Fecha_Ini"], true)+"','DD/MM/YYYY') ,TO_DATE('"+numeroAFecha(itemFile["Fecha_Fin"], true)+"','DD/MM/YYYY') )",{},{autoCommit:true})
        console.log('Wow! Si inserte!')
    }catch (err) {
        console.log('Ouch! No inserte! Participante', err)
        console.log(numeroAFecha(itemFile["Fecha_Fin"], true))
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
    console.log("Anio "+numeroAFecha(itemFile["Año"]))
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
          "SELECT id FROM partido where fecha=TO_DATE('"+numeroAFecha(itemFile["Fecha"], true)+"','DD/MM/YYYY') and estadio= (select estadio.id from estadio inner join pais on estadio.nombres='"+itemFile["Estadio"]+"' and pais.nombre='"+itemFile["Pais_Local"]+"' and pais.id=estadio.pais)" 
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
            "TO_DATE('"+numeroAFecha(itemFile["Fecha"], true)+"','DD/MM/YYYY'),"+
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
        "SELECT id FROM partido where fecha=TO_DATE('"+numeroAFecha(itemFile["Fecha"], true)+"','DD/MM/YYYY') and estadio= (select estadio.id from estadio inner join pais on estadio.nombres='"+itemFile["Estadio"]+"' and pais.nombre='"+itemFile["Pais_Local"]+"' and pais.id=estadio.pais)" 
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
      console.log(numeroAFecha(itemFile["Fecha_Fin"], true))
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

function consultaSelectUser(){
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
        connection.execute("SELECT * FROM usuarios", {}, {
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