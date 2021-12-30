import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu-equipos',
  templateUrl: './menu-equipos.component.html',
  styleUrls: ['./menu-equipos.component.css']
})
export class MenuEquiposComponent  {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }
}
