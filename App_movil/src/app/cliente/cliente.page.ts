import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
subjects;
  constructor(private router: Router) { }


  ngOnInit() {
    this.subjects =[
      {
        img:'assets/icon/jugadores.png',
        name: 'Jugadores'
      },
      {
        img:'assets/icon/director.png',
        name: 'Directores Tecnicos'
      },
      {
        img:'assets/icon/equipo.png',
        name: 'Equipos'
      },
      {
        img:'assets/icon/estadio.jpg',
        name: 'Estadios'
      },
      {
        img:'assets/icon/partido.png',
        name: 'Partidos'
      },
      {
        img:'assets/icon/competencia.png',
        name: 'Competencias'
      },
      {
        img:'assets/icon/membresia.png',
        name: 'Membresia'
      },
      {
        img:'assets/icon/cerrar.jpg',
        name: 'Cerrar Sesion'
      } 
    ]
  }

  goToSubject(){}
}
