import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(
    private router: Router,
    public noticiasService: NoticiasService
  ) { }
  
  ngOnInit(): void {
  }
  titulo: string=""
  equipo: string=""
  detalle: string=""


  enviar(){
    if(this.titulo=="" || this.equipo=="" || this.detalle==""){
      alert("Completar todos los campos")  
      return;
    }
    var usuario ={titulo:this.titulo,equipo:this.equipo,empleado:localStorage.getItem("id"),detalle:this.detalle};
    var ok;
      this.noticiasService.InsertNoticia(usuario).subscribe((error: Error)=>{
        console.log(error);
        
      })
      alert("XD")  
}

}
