import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registrar-estadio',
  templateUrl: './registrar-estadio.component.html',
  styleUrls: ['./registrar-estadio.component.css']
})
export class RegistrarEstadioComponent  {

  nombre: string="";
  capacidad:string="";
  pais:string="";
  direccion:string="";
  estado:string="";
  fechac:string="";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  CrearEstadio(){
    console.log("ESTADIO CREADO EXITOSAMENTE");
  }
  Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
