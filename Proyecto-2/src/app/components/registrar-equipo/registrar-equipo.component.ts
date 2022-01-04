import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-registrar-equipo',
  templateUrl: './registrar-equipo.component.html',
  styleUrls: ['./registrar-equipo.component.css']
})
export class RegistrarEquipoComponent {
  nombre: string="";
  pais:string="";
  fechafun:string="";
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  CrearEquipo(){
    console.log("EQUIPO CREADO EXITOSAMENTE");
  }

  Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
