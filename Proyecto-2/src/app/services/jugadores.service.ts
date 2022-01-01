import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });

  obtenerEdadesMay(edad : any):Observable<any>{
    const url = "http://localhost:3000/jugadorXedad";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEdadesMen(edad : any):Observable<any>{
    const url = "http://localhost:3000/jugadorXedadMen";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEquipos(equipos : any):Observable<any>{
    const url = "http://localhost:3000/jugadorXequipo";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,equipos,{headers});
  }


  obtenerEdadesMayD(edad : any):Observable<any>{
    const url = "http://localhost:3000/directorXedad";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEdadesMenD(edad : any):Observable<any>{
    const url = "http://localhost:3000/directorXedadMen";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEquiposD(equipos : any):Observable<any>{
    const url = "http://localhost:3000/directorXequipo";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,equipos,{headers});
  }

}
