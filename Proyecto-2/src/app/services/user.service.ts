import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs'; 

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
  InsertUser( firstName:string,lastName:string,
    email:string,password:string,telefono:string,genero:string,
    fechaNacimiento:string,fechaRegistro:string,direcc:string,
    pais:string){

      console.log(firstName, lastName);

      
    const url = "http://localhost:3000/AddUser";
    return this.http.post(url,{
      "firstName": firstName,
      "lastName":  lastName,
      "email": email,
      "password": password,
      "telefono": telefono,
      "genero": genero,
      "fechaNacimiento": fechaNacimiento,
      "fechaRegistro": fechaRegistro,
      "Direccion": direcc,
      "Pais": pais
    },{headers:this.headers}).pipe(map(data =>data));

  }
  //TODO : UPDATE USER

  //TODO : DELETE USER


}
