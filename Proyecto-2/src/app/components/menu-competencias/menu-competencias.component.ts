import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-menu-competencias',
  templateUrl: './menu-competencias.component.html',
  styleUrls: ['./menu-competencias.component.css']
})
export class MenuCompetenciasComponent  {

  constructor(
    private router: Router,
    public jugadorService: JugadoresService

  ) { }
  
  lista: any[]=[];
  

  cantidad: string="";
  equipo: string="";

  equipos(){
    var ganador={nombre: this.equipo, veces:this.cantidad};
    

    
    this.jugadorService.obtenerCompetenciaEquipos(ganador).subscribe((dataList: any)=>{
      this.lista=dataList["Competencias"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
  }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }
}
