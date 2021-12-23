const express = require("express");

const app = express();

app.get("/", (req,  res) =>{ 
    res.send("hola mundo!")
})

app.get("/cargarEstadios", (req,  res) =>{ 
    res.send("Cargar Estadios")
})
app.get("/cargarDirectores", (req,  res) =>{ 
    res.send("Cargar Directores")
})
app.get("/cargarEquipos", (req,  res) =>{ 
    res.send("Cargar Equipos")
})
app.get("/cargarJugadores", (req,  res) =>{ 
    res.send("Cargar Jugadores")
})
app.post("/cargarCompeticiones", (req,  res) =>{ 
    res.send("Cargar Competiciones")
})
app.get("/cargarPartidoIncidencia", (req,  res) =>{ 
    res.send("Cargar Partidos e Incidencias")
})

app.listen(3000, ()=>(
    console.log("servidor corriendo en el puerto",3000)
));