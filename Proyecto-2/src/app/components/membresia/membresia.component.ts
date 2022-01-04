import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MembresiaService } from 'src/app/services/membresia.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent  {

fecha:string="";
nombre:string="";
cvv:string="";
numeros:string="";

  constructor(
    private router: Router,
    private service: MembresiaService
  ) { }

  ngOnInit(): void {
  }
  Adquirir(){
    if(this.fecha==""||this.nombre==""||this.cvv==""||this.numeros==""){
      alert("Completar todos los campos");

      return
    }
    var usuario = {id: localStorage.getItem("id")}
    this.service.insertMembresia(usuario).subscribe(()=>{null
    })

    alert("Membresia adquirida");
  }
  

  Regresar(){
    this.router.navigate(['/usuarioHome'])
  }
}
