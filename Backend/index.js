const express = require("express");
const XLSX = require('xlsx'); //instalar paquete npm install xlsx
const bodyparser= require('body-parser'); //instalar paquete npm install body-parser
const oracledb = require('oracledb'); //instalar paquete npm install oracledb y oracle-instantclient-basic-21.4.0.0.0-1.el8.x86_64.rpm
const JSONTransport = require("nodemailer/lib/json-transport");
const { outFormat } = require("oracledb");
const cors = require('cors');
const nodemailer = require("nodemailer");//instalar paquete npm install nodemailer
const app = express();

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
      console.log("Listos para enviar");
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
    res.send("Cargar Jugadores")
})
app.post("/cargarCompeticiones", (req,  res) =>{ 
    res.send("Cargar Competiciones")
})
app.post("/cargarPartidoIncidencia", (req,  res) =>{ 
    res.send("Cargar Partidos e Incidencias")
})

app.listen(3000, ()=>(
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
        connection.execute("SELECT * FROM tipousuario", {}, {
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