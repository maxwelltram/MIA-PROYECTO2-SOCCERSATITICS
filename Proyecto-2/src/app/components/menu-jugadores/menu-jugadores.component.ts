import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu-jugadores',
  templateUrl: './menu-jugadores.component.html',
  styleUrls: ['./menu-jugadores.component.css']
})
export class MenuJugadoresComponent  {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }
}
