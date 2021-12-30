import { Component, OnInit } from '@angular/core';
import { LoginService} from "../../services/login.service";

@Component({
  selector: 'app-reset-contra',
  templateUrl: './reset-contra.component.html',
  styleUrls: ['./reset-contra.component.css']
})
export class ResetContraComponent implements OnInit {

  constructor(  public loginService: LoginService
    ) { }

    correo: string="";

  ngOnInit(): void {
  }

  EnviarCorreo(){
    console.log(this.correo);
    var correo ={correo:this.correo};
    this.loginService.Restablecer(correo).subscribe(Response => {null});;
  
  }

}
