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
  
  subirArchivo(archivo: any) {
    console.log(this.archivo)
    this.service.uploadFile(this.archivo).subscribe(Response => {null});
  }


  jugadores(){
    this.service.cargar("cargarJugadores").subscribe(Response => {null});
  }
  
  directores(){
    this.service.cargar("cargarDirectores").subscribe(Response => {null});
  }
  equipos(){
    this.service.cargar("cargarEquipos").subscribe(Response => {null});
  }
  estadios(){
    this.service.cargar("cargarEstadios").subscribe(Response => {null});
  }
  partidos(){
    this.service.cargar("cargarPartidoIncidencia").subscribe(Response => {null});
  }
  competiciones(){
    this.service.cargar("cargarCompeticiones").subscribe(Response => {null});
  }

Regresar(){
    this.router.navigate(['/empleadoHome'])
  }
}
