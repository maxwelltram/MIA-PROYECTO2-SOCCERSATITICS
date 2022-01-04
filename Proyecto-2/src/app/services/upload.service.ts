import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }


  uploadFile(File: Document, peticion: string): Observable<any> {
    
    console.log(File);
    var headers = new HttpHeaders().set("Content-Type", "text/plain");
    const url = "http://localhost:3000/ArchivosCarga";
    return this.http.post(url, File, { headers });
  }
}

