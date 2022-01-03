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


}
