import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  constructor(
    private router: Router,
    public registrarService: UserService
  ) { }

  ngOnInit(): void {
    
  }


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


  /*Registrar(){
    console.log(this.nombre);
    this.registrarService.InsertUser(this.nombre,this.apellido,this.email,this.password,this.telefono,this.genero,this.fechaN,this.fechaR,
      this.dir,this.pais);
  }*/
  Registrar(){
    var usuario ={nombre:this.nombre,apellido:this.apellido,email:this.email,pass:this.password,telefono:this.telefono,genero:this.genero,fechan:this.fechaN,fechar:this.fechaR, dir:this.dir,pais:this.pais};
    this.registrarService.InsertUser(usuario).subscribe(Response => {null});;
  
  }
  

}
