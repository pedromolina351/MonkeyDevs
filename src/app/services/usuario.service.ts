import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }
  
  //Funcion Login
  loginUsuario(data:any):Observable<any>{
    return this.httpClient.post('http://localhost:3000/usuario/login', 
    {
      correo: data.correo,
      password: data.password
    });
  }

  //Funcion Registrarse
  registrarse(data:any):Observable<any>{
    return this.httpClient.post('http://localhost:3000/usuario/registrar', 
    {
      nombre: data.nombre,
      apellido: data.apellido,
      usuario: data.usuario,
      correo: data.correo,
      password: data.password,
      plan: data.plan
    });
  }
}
