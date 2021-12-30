import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-empleado-home',
  templateUrl: './empleado-home.component.html',
  styleUrls: ['./empleado-home.component.css']
})
export class EmpleadoHomeComponent   {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  MenuJugadores(){
    //this.router.navigate(['/jugadoresMenu']);
  }

  MenuEquipos(){
    //this.router.navigate(['./equiposMenu']);
  }

}
