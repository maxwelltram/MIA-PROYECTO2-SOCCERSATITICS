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
    this.registrarService.GetUsers().subscribe((res)=>{
      console.log(res);
    })
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


  Registrar(){
    console.log(this.nombre);
    this.registrarService.InsertUser(this.nombre,this.apellido,this.email,this.password,this.telefono,this.genero,this.fechaN,this.fechaR,
      this.dir,this.pais);
  }
  

}
