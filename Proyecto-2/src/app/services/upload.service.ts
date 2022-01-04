import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }


  uploadFile(File: Document): Observable<any> {
    
    console.log(File);
    var headers = new HttpHeaders().set("Content-Type", "text/plain");
    const url = "http://localhost:3000/ArchivosCarga";
    return this.http.post(url, File, { headers });
  }


  cargar(dir: string): Observable<any> {
    var archivo = {ruta:"archivoConv.xlsx"}
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    const url = "http://localhost:3000/"+dir;
    return this.http.post(url, archivo, { headers });
  }

  usuariosXequipo( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/usuariosXequipo";
    return this.http.post<any>(url,equipo,{headers});
  }

  usuariosSinMem( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/usuariosSinMembresia";
    return this.http.post<any>(url,equipo,{headers});
  }

  usuariosConMem( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/usuariosConMembresia";
    return this.http.post<any>(url,equipo,{headers});
  }

  usuariosPais( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/usuariosXpais";
    return this.http.post<any>(url,equipo,{headers});
  }

  usuariosGen( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/usuariosXgenero";
    return this.http.post<any>(url,equipo,{headers});
  }
  empleadosNoticias( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/empleadosNoticias";
    return this.http.post<any>(url,equipo,{headers});
  }

  empleadosNoticiasEqui( equipo : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipo);
  
    const url = "http://localhost:3000/empleadosNoticiasXequipo";
    return this.http.post<any>(url,equipo,{headers});
  }

}

