import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent  {

fecha:string="";
nombre:string="";
cvv:string="";
numeros:string="";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  Adquirir(){

  }

  Regresar(){
    this.router.navigate(['/usuarioHome'])
  }
}
