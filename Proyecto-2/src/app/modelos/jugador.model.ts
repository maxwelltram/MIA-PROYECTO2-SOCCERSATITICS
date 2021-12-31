import { JugadoresService } from "../services/jugadores.service"

export class Jugador {
    Nombre: string
    Fecha: string
    Pais: string
    Posicion: string

    constructor(nombre: string, fecha: string, pais: string, posicion: string){
        this.Nombre=nombre
        this.Fecha=fecha
        this.Posicion=posicion
        this.Pais=pais
    }
}

export class ArrJugador{
    Jugadores: Jugador[]=[]
    constructor(){

    }
}

