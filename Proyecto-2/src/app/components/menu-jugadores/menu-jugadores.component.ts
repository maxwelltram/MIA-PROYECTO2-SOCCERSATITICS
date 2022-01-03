import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
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
  
  lista: any[]=[];

  edad:string = "";
  equipo:string = "";

  equipos(){
    console.log(this.edad)
    var equipo={nombre: this.equipo};
    
    var busqueda : any

    
    this.jugadorService.obtenerEquipos(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["Jugadores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

      
    })
  }
  edadesMayor(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEdadesMay(edad).subscribe((dataList: any)=>{
      this.lista=dataList["Jugadores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

   
    })
    
   
  }

  edadesMenor(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEdadesMen(edad).subscribe((dataList: any)=>{
      this.lista=dataList["Jugadores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
    
   
  }




  Regresar(){
    this.router.navigate(['./usuarioHome'])
    
  }
}
