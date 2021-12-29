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


  GetLogin(user : any){
    const url = "http://localhost:3000/AccesoLogin";
    return this.http.get(url);
  }

}
