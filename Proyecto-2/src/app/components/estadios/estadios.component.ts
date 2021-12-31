import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent  {

  constructor(
    private router: Router
  ) { }

  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }

}
