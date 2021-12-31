import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent  {

  constructor(
    private router: Router
  ) { }

  consulta: string = '';

  IngresarConsulta(dato: string){

  }

}
