import { Component, OnInit } from '@angular/core';
import { Router} from  '@angular/router';
import { LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }

usuario: string="";
password: string="";

 /* Ingresar(){
console.log(this.usuario);
var user={usuario:this.usuario,password:this.password};
this.loginService.GetLogin(user).subscribe(Response => {null});;


this.router.navigate(['/about']);

  }*/




  Ingresar(){
    console.log(this.usuario)
    var user={usuario:this.usuario,password:this.password};
    var busqueda : any

    
    this.loginService.GetLogin(user).subscribe((dataList: any)=>{
      busqueda = dataList 
      console.log(busqueda)
      if (busqueda[0]["CORREO"]==user.usuario && busqueda[0]["CLAVE"] == user.password) {
        if (busqueda[0]["TIPO"] == 1) {
          this.router.navigate(['/about'])
          localStorage.setItem("tipo", "admin")
          localStorage.setItem("user", busqueda[0]["CORREO"])
          alert("Bienvenido Admin")

        }else if (busqueda[0]["TIPO"] == 2) {
          this.router.navigate(['/about'])
          localStorage.setItem("tipo", "empleado")
          localStorage.setItem("user", busqueda[0]["CORREO"])
          alert("Bienvenido Empleado")
        }else{
          this.router.navigate(['/about'])
          localStorage.setItem("tipo", "cliente")
          localStorage.setItem("user", busqueda[0]["CORREO"])
          alert("Bienvenido Usuario")
        }
      }
      else{
        busqueda as object
        alert("no se pudo :c")

      }
    },(err)=>{
    console.log("no se pudo")

    })
    
   
  }





  Registrar(){
    this.router.navigate(['/registrar']);
  }

}
