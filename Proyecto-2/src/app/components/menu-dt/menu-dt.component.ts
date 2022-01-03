import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-menu-dt',
  templateUrl: './menu-dt.component.html',
  styleUrls: ['./menu-dt.component.css']
})
export class MenuDTComponent implements OnInit {

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

    
    this.jugadorService.obtenerEquiposD(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["Directores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)
    })
  }
  edadesMayor(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEdadesMayD(edad).subscribe((dataList: any)=>{
      this.lista=dataList["Directores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
    
   
  }

  edadesMenor(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEdadesMenD(edad).subscribe((dataList: any)=>{
      this.lista=dataList["Directores"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
    
   
  }




  Regresar(){
    this.router.navigate(['./usuarioHome'])
    
  }
}
