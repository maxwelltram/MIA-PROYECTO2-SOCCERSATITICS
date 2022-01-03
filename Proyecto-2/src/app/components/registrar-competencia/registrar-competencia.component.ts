import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registrar-competencia',
  templateUrl: './registrar-competencia.component.html',
  styleUrls: ['./registrar-competencia.component.css']
})
export class RegistrarCompetenciaComponent  {


  nombre: string="";
  anio:string="";
  tipo:string="";
  campeon:string="";
  pais:string="";


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  CrearCompetencia(){
    console.log("COMPETENCIA CREADA EXITOSAMENTE");
  }
  Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
