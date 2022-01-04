import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });


  insertMembresia( membresia : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(membresia);
    
    const url = "http://localhost:3000/AddMembresia";
    return this.http.post(url,membresia,{headers});
  }


  insertSuscripcion( membresia : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(membresia);
  
    const url = "http://localhost:3000/AddSuscripcion";
    return this.http.post(url,membresia,{headers});
  }

}
