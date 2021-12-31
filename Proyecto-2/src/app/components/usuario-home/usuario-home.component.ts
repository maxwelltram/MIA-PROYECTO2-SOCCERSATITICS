import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-usuario-home',
  templateUrl: './usuario-home.component.html',
  styleUrls: ['./usuario-home.component.css']
})
export class UsuarioHomeComponent {

  constructor(
    private router: Router
  ) { }

    MenuJugadores(){
      this.router.navigate(['./jugadoresMenu'])
    }
    MenuDt(){
      this.router.navigate(['./menuDt'])
    }

    MenuEquipo(){
      this.router.navigate(['./equiposMenu'])
    }

}
