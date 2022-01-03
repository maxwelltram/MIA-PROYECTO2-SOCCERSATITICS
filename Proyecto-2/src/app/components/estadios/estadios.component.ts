import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent  {

  constructor(
    private router: Router,
    public jugadorService: JugadoresService

  ) { }
  lista: any[]=[];

  capacidad:string = "";
  pais:string = "";

  
  paises(){
    console.log(this.capacidad)
    var pais={nombre: this.pais};
    
    var busqueda : any

    
    this.jugadorService.obtenerEstadiosPais(pais).subscribe((dataList: any)=>{
      this.lista=dataList["Estadios"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
    
   
  }

  antiguedad(){
    console.log(this.capacidad)
    var edad={capacidad: parseInt(this.capacidad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEstadiosCapacidad(edad).subscribe((dataList: any)=>{
      this.lista=dataList["Estadios"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
  }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }

}
