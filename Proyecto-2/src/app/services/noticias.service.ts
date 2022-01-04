import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });


InsertNoticia( noticia : any) :Observable<any> {      
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(noticia);
    
  const url = "http://localhost:3000/AddNoticia";
  return this.http.post<any>(url,noticia,{headers});
}


obtenerNoticias() :Observable<any> {      
  var headers = new HttpHeaders().set("Content-Type", "application/json");  
  const url = "http://localhost:3000/GetNoticias";
  return this.http.get<any>(url);
}



}
