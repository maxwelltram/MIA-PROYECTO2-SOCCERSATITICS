import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {

  constructor(
    private router: Router,
    public service: UploadService
  ) { }
  ngOnInit(): void {
  }
  archivo:any

  leerArchivo(e: any) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e: any) {
      var contenido = e.target.result;
    };
    lector.readAsText(archivo);
    this.archivo= archivo
  }
  
  subirArchivo(archivo: any, peticion: string) {
    console.log(this.archivo)
    this.service.uploadFile(this.archivo, peticion).subscribe(Response => {this.archivo});
  }

}
