import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-menu-partidos',
  templateUrl: './menu-partidos.component.html',
  styleUrls: ['./menu-partidos.component.css']
})
export class MenuPartidosComponent  {

  constructor(
    private router: Router,
    public jugadorService: JugadoresService

  ) { }
  gol:string="";
  equipo:string="";
  lista: any[]=[];

  goles(){
    var partido={goles: this.gol};
    

    
    this.jugadorService.obtenerPartidoGoles(partido).subscribe((dataList: any)=>{
      this.lista=dataList["Partidos"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
  }

  equipos(){
    var partido={nombre: this.equipo};
    

    
    this.jugadorService.obtenerPartidoEquipos(partido).subscribe((dataList: any)=>{
      this.lista=dataList["Partidos"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
  }




  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }

}
