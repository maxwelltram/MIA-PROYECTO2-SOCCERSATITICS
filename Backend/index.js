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
        insertarDatos(cargarArchivo(ruta));
        res.end();
    })

    var fecha = numeroAFecha(4606, true);
    console.log(fecha);
})
app.post("/cargarDirectores", (req,  res) =>{ 
    res.send("Cargar Directores");
})
app.post("/cargarEquipos", (req,  res) =>{ 
    res.send("Cargar Equipos")
})
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

 async function insertarDatos(datos){
    for(const itemFile of datos){
        //console.log(itemFile)
    
        oracledb.getConnection(connection,  function (err, connection) {
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
            let pais = consultaSelectPais(itemFile["Pais"]);
            console.log(consultaSelectPais(itemFile["Pais"]))

            //if (pais==undefined){pais=0}
            //console.log(pais)

                if (pais==0){
                    connection.execute("INSERT INTO pais VALUES (TEST_ID_SEQ.nextval, '"+itemFile["Pais"]+"')",{},{autoCommit:true}, 
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
    
                        } else {
                            connection.release(
                                function (err) {
                                    if (err) {
                                        console.error(err.message);
        
                                    } else {
                                        console.log("POST /sendTablespace : Connection released1");
        
                                    }
                                });
                        }
                        // Release the connection
                        
                    });
                }
                //pais = consultaSelectPais(itemFile["Pais"]);
                console.log(pais)
            


        

            
        });

    }

    
}




function numeroAFecha(numeroDeDias, esExcel = false) {
    var diasDesde1900 = esExcel ? 25567 + 2 : 25567;
  
    // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
    return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
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
var id = 0;
function  consultaSelectPais(nombre) {
    var retorno1=0;
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
        connection.execute("SELECT id FROM pais where nombre='"+nombre+"'", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            var retorno=0;
            if (err) {
            } else {
                try {
                    console.log(result.rows[0].ID);
                    retorno=result.rows[0].ID;
                    id = retorno

                } catch (error) {
                    id = retorno
                    console.log(retorno)   ;  

                }     
                

                
            }
        });
        

    });
    retorno1=id;
        console.log("retorno1 2 " + retorno1)

    return retorno1;
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
        connection.execute("SELECT * FROM pais", {}, {
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