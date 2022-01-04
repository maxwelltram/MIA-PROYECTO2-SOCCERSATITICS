import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-empleado-home',
  templateUrl: './empleado-home.component.html',
  styleUrls: ['./empleado-home.component.css']
})
export class EmpleadoHomeComponent   {

  constructor(
    private router: Router
  ) { }

  
  ConsultaGlobal(){
    //this.router.navigate(['/consultaRep']);
    console.log('INGRESAR CONSULTA') 
  }
  CargaMasiva(){
    this.router.navigate(['/cargaMasiva']);
  }
  


  pagNoticias(){
    this.router.navigate(['/noticias']);
  }


  RegistrarJugador(){
    this.router.navigate(['/registrarJugador']);
  }
  RegistrarDT(){
    this.router.navigate(['/registrarDT']);
  }
  RegistrarEquipo(){
    this.router.navigate(['/registrarEquipo']);
  }
  RegistrarEstadio(){
    this.router.navigate(['/registrarEstadio']);
  }
  RegistrarPartido(){
    this.router.navigate(['/registrarPartido']);
  }
  RegistrarCompetencia(){
    this.router.navigate(['/registrarCompetencia']);
  }


}
