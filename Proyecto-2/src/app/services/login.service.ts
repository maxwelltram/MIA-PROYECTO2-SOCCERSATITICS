import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });
 
  Restablecer(correo : any):Observable<any>{
    const url = "http://localhost:3000/Restablecer";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,correo,{headers});
  }



  GetLogin(user : any):Observable<any>{
    const url = "http://localhost:3000/AccesoLogin";
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post<any>(url,user,{headers});
  }

}
