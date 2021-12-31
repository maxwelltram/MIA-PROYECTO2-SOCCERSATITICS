import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu-competencias',
  templateUrl: './menu-competencias.component.html',
  styleUrls: ['./menu-competencias.component.css']
})
export class MenuCompetenciasComponent  {

  constructor(
    private router: Router
  ) { }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }
}
