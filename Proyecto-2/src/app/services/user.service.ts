import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "aplication/json"
  });


  //TODO : GET USERS
  GetUsers(){
    const url = "http://localhost:3000/getUsers";
    return this.http.get(url);
  }
  //TODO : INSERT USERS
  InsertUser( usuario : any) :Observable<any> 
    {      
      var headers = new HttpHeaders().set("Content-Type", "application/json");
      console.log(usuario);
      console.log("holamundo");
      
    const url = "http://localhost:3000/AddUser";
    return this.http.post(url, usuario, {headers});
  }
  //TODO : UPDATE USER

  //TODO : DELETE USER


}
