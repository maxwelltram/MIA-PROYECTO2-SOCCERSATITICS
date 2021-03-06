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
      this.router.navigate(['./dtMenu'])
    }

    MenuEquipo(){
      this.router.navigate(['./equiposMenu'])
    }
    MenuEstadios(){
      this.router.navigate(['./estadiosMenu'])
    }
    MenuPartidos(){
      this.router.navigate(['./partidosMenu'])
    }
    MenuCompetencias(){
      this.router.navigate(['./competenciasMenu'])
    }
    MenuNoticias(){
      this.router.navigate(['./noticiasCli'])
    }
    Membresia(){
      this.router.navigate(['./membresiaC'])
    }
    suscripcion(){
      this.router.navigate(['./suscripciones'])
    }
}
