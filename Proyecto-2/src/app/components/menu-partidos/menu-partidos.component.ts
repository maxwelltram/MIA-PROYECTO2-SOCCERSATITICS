import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu-partidos',
  templateUrl: './menu-partidos.component.html',
  styleUrls: ['./menu-partidos.component.css']
})
export class MenuPartidosComponent  {

  constructor(
    private router: Router
  ) { }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }

}
