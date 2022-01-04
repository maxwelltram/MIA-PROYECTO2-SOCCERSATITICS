import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {

  constructor(
    private router: Router,
    private service: MembresiaService
  ) { }

  
  ngOnInit(): void {
  }
  equipo:string="";

  
  suscribir(){
    if(this.equipo==""){
      alert("Completar todos los campos");

      return
    }
    var usuario = {equipo:this.equipo, id: localStorage.getItem("id")}
    this.service.insertSuscripcion(usuario).subscribe(()=>{null
    })

    alert("Suscrpcion adquirida");
  }
  Regresar(){
    this.router.navigate(['/usuarioHome'])
  }
}
