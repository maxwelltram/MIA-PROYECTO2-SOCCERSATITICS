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

}

