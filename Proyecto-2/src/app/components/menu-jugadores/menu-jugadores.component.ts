import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ArrJugador, Jugador } from 'src/app/modelos/jugador.model';
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-menu-jugadores',
  templateUrl: './menu-jugadores.component.html',
  styleUrls: ['./menu-jugadores.component.css']
})
export class MenuJugadoresComponent  {

  constructor(
    private router: Router,
    public jugadorService: JugadoresService

  ) { }
  
  ngOnInit(): void {
  }
  listaAux: ArrJugador = new ArrJugador();
  listaJugadores:Jugador[]=[];
  lista: any[]=[];

  edad:string = "";
  equipo:string = "";

  equipos(){
    console.log(this.edad)
    var equipo={nombre: this.equipo};
    
    var busqueda : any

    
    this.jugadorService.obtenerEquipos(equipo).subscribe((dataList: any)=>{
      this.listaAux.Jugadores=dataList;
      this.lista=dataList["Jugadores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

      console.log("Aux",this.listaAux)
      this.setearLista();
      console.log("lista",this.listaJugadores)
    })
  }
  edadesMayor(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEdadesMay(edad).subscribe((dataList: any)=>{
      this.listaAux.Jugadores=dataList;
      this.lista=dataList["Jugadores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

      console.log("Aux",this.listaAux)
      this.setearLista();
      console.log("lista",this.listaJugadores)
    })
    
   
  }

  edadesMenor(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEdadesMen(edad).subscribe((dataList: any)=>{
      this.listaAux.Jugadores=dataList;
      this.lista=dataList["Jugadores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

      console.log("Aux",this.listaAux)
      this.setearLista();
      console.log("lista",this.listaJugadores)
    })
    
   
  }


  setearLista(){
    
    for (let i = 0; i < this.listaAux.Jugadores.length; i++) {
      var jugador: Jugador      
      jugador = new Jugador(this.listaAux.Jugadores[i].Nombre,this.listaAux.Jugadores[i].Fecha,this.listaAux.Jugadores[i].Pais,this.listaAux.Jugadores[i].Posicion,)
      this.listaJugadores.push(jugador);
      console.log(i)
    }
  }


  Regresar(){
    this.router.navigate(['./usuarioHome'])
    
  }
}
