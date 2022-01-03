import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registrar-partido',
  templateUrl: './registrar-partido.component.html',
  styleUrls: ['./registrar-partido.component.css']
})
export class RegistrarPartidoComponent implements OnInit {

  fecha: string="";
  estadio:string="";
  asistencia:string="";
  equipoV:string="";
  equipoL:string="";
  resultado:string="";
  incidencias:string="";
  estado:string="";


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  CrearPartido(){
    console.log("PARTIDO CREADO EXITOSAMENTE");
  }
  Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
