import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent  {

  constructor(
    private router: Router
  ) { }

   nombre: string="";
   apellido: string="";
   email: string="";
   password: string="";
   telefono: string="";
   genero: string="";
   fechaN: string="";
   fechaR: string="";
   dir: string="";
   pais: string="";
   rol: string="";

   CrearUsuario(){
     console.log("USUARIO CREADO EXITOSAMENTE")
   }

}
