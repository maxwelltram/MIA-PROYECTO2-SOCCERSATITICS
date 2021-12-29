import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

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
  constructor(
    private router: Router,
    public registrarService: UserService
  ) { }

  ngOnInit(): void {
    
  }


  


  Registrar(){
    var usuario ={nombre:this.nombre,apellido:this.apellido,email:this.email,pass:this.password,telefono:this.telefono,genero:this.genero,fechan:this.fechaN,fechar:this.fechaR, dir:this.dir,pais:this.pais};
    this.registrarService.InsertUser(usuario).subscribe(Response => {null});;


  
  }
  

}
