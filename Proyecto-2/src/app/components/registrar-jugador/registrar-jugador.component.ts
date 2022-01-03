import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registrar-jugador',
  templateUrl: './registrar-jugador.component.html',
  styleUrls: ['./registrar-jugador.component.css']
})
export class RegistrarJugadorComponent {

  constructor(
    private router: Router
  ) { }

 nombre: string="";
 nacionalidad:string="";
 paisE:string="";
 equipo:string="";
 fechanac:string="";
 fechaini:string="";
 fechafin:string="";

  ngOnInit(): void {
  }

  CrearJugador(){
    console.log("JUGADOR CREADO EXITOSAMENTE");
  }
  Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
