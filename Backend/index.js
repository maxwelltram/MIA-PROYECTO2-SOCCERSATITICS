const express = require("express");
const XLSX = require('xlsx');
const bodyparser= require('body-parser');
const oracledb = require('oracledb');
const app = express();

async function run() {
    let connection = await oracledb.getConnection( {
    user : "proyecto",
    password : "1234",
    connectString : "localhost:1521/ORCL18" // [hostname]:[port]/[DB service name]
  });
  let result = await connection.execute( "SELECT * FROM tipousuario");
  console.log(result.rows[0]);
} 

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get("/", (req,  res) =>{ 
    res.send("hola mundo!");
    run();
    
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
        cargarArchivo(ruta);
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
    console.log("servidor corriendo en el puerto",3000)
    //cargarArchivo("archivo.xlsx")
));

function cargarArchivo(ruta){
    const libro = XLSX.readFile(ruta);
    const libroSheets = libro.SheetNames;
    const sheet = libroSheets[0];
    const data = XLSX.utils.sheet_to_json(libro.Sheets[sheet]);
    for(const itemFile of data){
        console.log(itemFile)
    }
    console.log(libroSheets);
}


function numeroAFecha(numeroDeDias, esExcel = false) {
    var diasDesde1900 = esExcel ? 25567 + 2 : 25567;
  
    // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
    return new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
  }
  
  app.get('/users', function (req, res) {
    "use strict";

    oracledb.getConnection({
        user: "proyecto",
        password: "1234",
        connectString : "172.17.0.2/ORCL18"
    }, function (err, connection) {
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
                res.header('Access-Control-Allow-Origin','*');
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
				
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /sendTablespace : Connection released");
                    }
                });
        });
    });
});



  