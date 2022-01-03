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


ngOnInit(): void {
  console.log(localStorage.getItem("user"))
  localStorage.clear()
  console.log(localStorage.getItem("user"))


}


  Ingresar(){

    if(this.usuario=="" || this.password==""){
      alert("Completar todos los campos")  
      return;
    }
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
          localStorage.setItem("id", busqueda[0]["ID"])
          alert("Bienvenido Admin")

        }else if (busqueda[0]["TIPO"] == 2) {
          this.router.navigate(['/empleadoHome'])
          localStorage.setItem("tipo", "empleado")
          localStorage.setItem("user", busqueda[0]["CORREO"])
          localStorage.setItem("id", busqueda[0]["ID"])

          alert("Bienvenido Empleado")
        }else{
          this.router.navigate(['/usuarioHome'])
          localStorage.setItem("tipo", "cliente")
          localStorage.setItem("user", busqueda[0]["CORREO"])
          localStorage.setItem("id", busqueda[0]["ID"])
          alert("Bienvenido Usuario")
        }
      }
      else{
        busqueda as object
        alert("no se pudo :c")

      }
    },(err)=>{
    console.log("no se pudo")

    })*/
    this.router.navigate(['/usuarioHome']);
    
  }

  Recuperar(){
    this.router.navigate(['resetContrasenia']);
  }



  Registrar(){
    this.router.navigate(['/registrar']);
  }

}
