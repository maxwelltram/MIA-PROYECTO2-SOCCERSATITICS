import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { JugadoresService } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-menu-equipos',
  templateUrl: './menu-equipos.component.html',
  styleUrls: ['./menu-equipos.component.css']
})
export class MenuEquiposComponent implements OnInit {

  constructor(
    private router: Router,
    public jugadorService: JugadoresService

  ) { }
  ngOnInit(): void {
  }
  
  lista: any[]=[];
  
  competicion:string = "";

  edad:string = "";
  pais:string = "";


  competiciones(){
    console.log(this.edad)
    var comp={nombre: this.competicion};
    

    
    this.jugadorService.obtenerEquipoCompeticion(comp).subscribe((dataList: any)=>{
      this.lista=dataList["Equipos"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)
    })
  }
  paises(){
    console.log(this.edad)
    var pais={nombre: this.pais};
    
    var busqueda : any

    
    this.jugadorService.obtenerEquipoPais(pais).subscribe((dataList: any)=>{
      this.lista=dataList["Equipos"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
    
   
  }

  antiguedad(){
    console.log(this.edad)
    var edad={edad: parseInt(this.edad)};
    
    var busqueda : any

    
    this.jugadorService.obtenerEquipoAntiguedad(edad).subscribe((dataList: any)=>{
      this.lista=dataList["Equipos"];
      console.log("Listita",this.lista)
      console.log(this.lista[0].NOMBRE)

    })
    
   
  }



  
  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }
}
