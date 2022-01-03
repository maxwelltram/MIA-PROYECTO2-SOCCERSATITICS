import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registrar-dt',
  templateUrl: './registrar-dt.component.html',
  styleUrls: ['./registrar-dt.component.css']
})
export class RegistrarDTComponent {
  nombre: string="";
  pais:string="";
  paisE:string="";
  estado:string="";
  equipo:string="";
  fechanac:string="";
  fechaini:string="";
  fechafin:string="";
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  CrearDT(){
    console.log("DT CREADO EXITOSAMENTE");
  }
  Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
