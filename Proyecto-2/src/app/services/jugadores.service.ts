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


  obtenerEquipoCompeticion(edad : any):Observable<any>{
    const url = "http://localhost:3000/equipoXcompeticion";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEquipoPais(edad : any):Observable<any>{
    const url = "http://localhost:3000/equipoXpais";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEquipoAntiguedad(equipos : any):Observable<any>{
    const url = "http://localhost:3000/equipoXantiguedad";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,equipos,{headers});
  }

  obtenerEquipoJugador(edad : any):Observable<any>{
    const url = "http://localhost:3000/jugadorEstuvoXequipo";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }


  obtenerEquipoDirector(edad : any):Observable<any>{
    const url = "http://localhost:3000/directorEstuvoXequipo";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }



  obtenerEstadiosPais(edad : any):Observable<any>{
    const url = "http://localhost:3000/estadioXpais";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,edad,{headers});
  }

  obtenerEstadiosCapacidad(equipos : any):Observable<any>{
    const url = "http://localhost:3000/estadioXcapacidad";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,equipos,{headers});
  }
  
  obtenerPartidoGoles(equipos : any):Observable<any>{
    const url = "http://localhost:3000/partidosXgoles";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,equipos,{headers});
  }

  obtenerPartidoEquipos(equipos : any):Observable<any>{
    const url = "http://localhost:3000/partidosXequipo";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,equipos,{headers});
  }

  obtenerCompetenciaEquipos(equipos : any):Observable<any>{
    const url = "http://localhost:3000/competenciaXvecesYequipo";
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(equipos)
    return this.http.post<any>(url,equipos,{headers});
  }

}
