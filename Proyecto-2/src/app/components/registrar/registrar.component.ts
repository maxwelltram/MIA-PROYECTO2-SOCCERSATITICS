import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  constructor() { }

  NuevoUsuario ={
    nombre:'',
    apellido:'',
    email:'',
    password:''
  }

  Registrar(){
    console.log(this.NuevoUsuario);
  }

}
