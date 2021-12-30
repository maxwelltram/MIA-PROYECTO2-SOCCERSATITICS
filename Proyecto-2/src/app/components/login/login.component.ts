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

  Ingresar(){
  console.log(this.usuario);
  var user={usuario:this.usuario,password:this.password};
  this.loginService.GetLogin(user).subscribe(Response => {null});;
  //this.router.navigate(['/empleadoHome']);
  this.router.navigate(['./usuarioHome'])
  }

  Recuperar(){
    this.router.navigate(['resetContrasenia']);
  }

  Registrar(){
    this.router.navigate(['/registrar']);
  }

}
