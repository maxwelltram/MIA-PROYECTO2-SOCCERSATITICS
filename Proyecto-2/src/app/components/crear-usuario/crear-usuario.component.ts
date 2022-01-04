import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent  {

  constructor(
    private router: Router,
    public registrarService: UserService
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

   Registrar(){
    if(this.nombre=="" || this.apellido=="" || this.email==""||this.password=="" || this.telefono=="" || this.genero==""||this.fechaN=="" || this.fechaR=="" || this.dir==""||this.pais==""||this.rol==""){
      alert("Completar todos los campos")  
      return;
    }
      var usuario ={nombre:this.nombre,apellido:this.apellido,email:this.email,pass:this.password,telefono:this.telefono,genero:this.genero,fechan:this.fechaN,fechar:this.fechaR, dir:this.dir,pais:this.pais,rol:this.rol};
      var ok;
        this.registrarService.InsertUser(usuario).subscribe((error: Error)=>{
          console.log(error);
          
        })
        this.router.navigate(['./login'])

        alert("XD")  
  }

}
